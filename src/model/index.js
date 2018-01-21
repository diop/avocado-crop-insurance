function getProb({
  week,
  minTemp,
  rainfall,
  sunlightExposure,
  elevation,
  experience,
  size_of_farm,
  technique,
  disease
}) {

  const exp = Math.exp(
    0.1244899
    + 0.0009378637 * week
    + 0.0003744942 * minTemp
    + 0.002816007 * rainfall
    + 0.003786983 * sunlightExposure
    + 0.000004729335 * elevation
    + 0.0009401107 * experience
    + 0.0004923823 * size_of_farm
    + 0.02829916 * technique
    + 0.02829434 * disease
  )

  var probSuccess = exp / (1 + exp)

  return probSuccess;
}

module.exports = { getProb }
