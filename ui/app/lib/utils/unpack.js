export default
  $q => response => $q(
    (resolve, reject) =>
      response.success
        ? resolve(response.data)
        : reject(response.message)
  )
