library(ROCR)
library(Epi)
library(xlsx)
library(car)
library(tidyverse)
library(ResourceSelection)
library(data.table)
library(xgboost) 
inputData<-fread("./version2/allfile")
#set factors
inputData$technique <- as.factor(inputData$technique)
inputData$pests <- as.factor(inputData$pests)
inputData$natural_disaster_occurance <- as.factor(inputData$natural_disaster_occurance)
inputData$disease <- as.factor(inputData$disease)
inputData$success <- as.factor(inputData$success)

inputData$success <- rbinom(21000, 1, 0.82)
#set 30% as test dataset 
train.ind <- sample(1:dim(inputData)[1], 0.7 * dim(inputData)[1])
train <- inputData[train.ind, ]
test <- inputData[-train.ind, ]
train[,18]

###random forest 
library(randomForest)
x_train=unlist(train[,-15])
y_train=train[, 15]
rf <- randomForest(x = x_train, y = y_train, importance = TRUE,
                   do.trace = TRUE, nodesize = 6200, ntree = 10)
####xboost
feature.matrix <- model.matrix( ~ ., data = train[, -15]) 
# Remember we removed rows with NA in randomForest fitting. model.matrix will also remove rows with any NA.
train.label <- as.numeric(train$success)
set.seed(1)
train.label
gbt <- xgboost(data =  feature.matrix, 
               label = train.label, 
               max_depth = 8, # for each tree, how deep it goes
               nround = 20, # number of trees
               objective = "binary:logistic",
               nthread = 3,
               verbose = 1)

importance <- xgb.importance(feature_names = colnames(feature.matrix), model = gbt)
importance
# Gain: contribution of each feature to the model. improvement in accuracy brought by a feature to the branches it is on.
#       For boosted tree model, gain of each feature in each branch of each tree is taken into account, 
#       then average per feature to give a vision of the entire model.
#       Highest percentage means important feature to predict the label used for the training.
# Cover: the number of observation through a branch using this feature as split feature 
# Frequency: counts the number of times a feature is used in all generated trees (often we don't use it).

xgb.plot.importance(importance)
# There might be error. If so, try to install library below.
library(Ckmeans.1d.dp)
xgb.plot.importance(importance)
# xgb.plot.tree(model = gbt)
# library("DiagrammeR")
# xgb.plot.tree(feature_names = colnames(feature.matrix), model = gbt, n_first_tree = 1)

# what's the optimal parameter, for example, number of trees?
par <- list( max_depth = 8,
             objective = "binary:logistic",
             nthread = 3,
             verbose = 2)
gbt.cv <- xgb.cv(params = par,
                 data = feature.matrix, label = train.label,
                 nfold = 5, nrounds = 30)
# gbt.cv is to choose best nrounds based on certain parameters set. 
# Because, too small nrounds is underfitting, and too large nrounds is overfitting
# But what about the other parameters? 
# See: http://stackoverflow.com/questions/35050846/xgboost-in-r-how-does-xgb-cv-pass-the-optimal-parameters-into-xgb-train

plot(gbt.cv$evaluation_log$train_rmse_mean, type = 'l')
lines(gbt.cv$evaluation_log$test_rmse_mean, col = 'red')
nround = which(gbt.cv$evaluation_log$test_rmse_mean == 
                 min(gbt.cv$evaluation_log$test_rmse_mean)) # 11
gbt <- xgboost(data = feature.matrix, 
               label = train.label,
               nround = nround,
               params = par)

# grid searching for parameters.
all_param = NULL
all_test_rmse = NULL
all_train_rmse = NULL

for (iter in 1:20) {
  print(iter)
  param <- list(objective = "reg:linear",
                max_depth = sample(5:12, 1), 
                subsample = runif(1, .6, .9)
                #   eta = runif(1, .01, .3)
                #  gamma = runif(1, 0.0, 0.2),
                #  colsample_bytree = runif(1, .5, .8), 
                #  min_child_weight = sample(1:40, 1),
                #  max_delta_step = sample(1:10, 1)
  )
  cv.nround = 10
  cv.nfold = 5
  set.seed(iter)
  mdcv <- xgb.cv(data=feature.matrix, label = train.label, params = param, 
                 nfold=cv.nfold, nrounds=cv.nround,
                 verbose = T, # early_stop_round=8, 
                 maximize = FALSE)
  min_train_rmse = min(mdcv$evaluation_log$train_rmse_mean)
  min_test_rmse = min(mdcv$evaluation_log$test_rmse_mean)
  
  all_param <- rbind(all_param, unlist(param)[-1])
  all_train_rmse <- c(all_train_rmse, min_train_rmse)
  all_test_rmse <- c(all_test_rmse, min_test_rmse)
}
all_param <- as.data.frame(as.numeric(all_param))
cbind(all_param, all_test_rmse)
summary(all_test_rmse[which(all_param == 5)])
summary(all_test_rmse[which(all_param == 12)])
# then build the model with best parameter combination from the cross validation result.

# prediction
test.data <- test.data[which(apply(test.data, 1, 
                                   function(x) length(which(is.na(x))) == 0)), ]
prediction <- predict(gbt, model.matrix( ~ ., data = test.data[, feat.cols]))
sum((prediction - test.data$logerror)^2)/dim(test.data)[1]
sum((predict(tree1, test.data) - test.data$logerror)^2)/dim(test.data)[1]
sum((predict(rf, test.data) - test.data$logerror)^2)/dim(test.data)[1]
sum((predict(lm(formula, train.data), test.data) - test.data$logerror)^2)/dim(test.data)[1]


######logistic regression 
formula=paste0(colnames(inputData),sep="+")
formula
min_temp+max_temp+rainfall_in+humidity+
acidity+sunlight_exposure+elevation+experience+size_of_farm+technique+pests+
natural_disaster_occurance+disease
library(Boruta)
boruta_output <- Boruta(success ~ min_temp+max_temp+rainfall_in+humidity+
                          acidity+sunlight_exposure+elevation+experience+size_of_farm+technique+pests+
                          natural_disaster_occurance+disease, data=na.omit(train), doTrace=2)  
boruta_signif <- names(boruta_output$finalDecision[boruta_output$finalDecision %in% c("Confirmed", "Tentative")])  # collect Confirmed and Tentative variables
boruta_signif <- names(boruta_output$finalDecision[boruta_output$finalDecision %in% c("Confirmed", "Tentative")])  # collect Confirmed and Tentative variables
print(boruta_signif)  
plot(boruta_output, cex.axis=.7, las=2, xlab="", main="Variable Importance")  # plot variable importance

#first model ### full model 
full<- glm(success ~ .,data = inputData, family = binomial())
summary(full)
ROC(form = success ~ ., data = inputData, AUC = T, MI = F)#aic 70
#model 2
full1<- glm(success ~ year+week+min_temp+max_temp+rainfall_in+humidity+
              acidity+sunlight_exposure+elevation+experience+size_of_farm+technique+pests+
              natural_disaster_occurance+disease,data = inputData, family = binomial())
a<-summary(full1)
ROC(form = success ~ week+min_temp+rainfall_in+
      sunlight_exposure+elevation+experience+size_of_farm+technique+
      disease, data = inputData, AUC = T, MI = F)#aic 70

#model 3
full1<- glm(success ~week+min_temp+rainfall_in+
              sunlight_exposure+elevation+experience+size_of_farm+technique+
              disease,data = inputData, family = binomial())
summary(full1)
ROC(form = success ~ week+min_temp+rainfall_in+
      sunlight_exposure+elevation+experience+size_of_farm+technique+
      disease, data = inputData, AUC = T, MI = F)#aic 70

#model4
full1<- glm(success ~min_temp+max_temp+size_of_farm+elevation+humidity+rainfall_in+acidity+technique+disease,data = inputData, family = binomial())
summary(full1)
ROC(form = success ~ min_temp+size_of_farm+elevation+humidity+rainfall_in+acidity+technique+disease, data = inputData, AUC = T, MI = F)#aic 70
