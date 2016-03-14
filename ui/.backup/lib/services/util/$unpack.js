/*@ngInject*/
function $unpack($q) {
  return (response) =>
    $q((resolve, reject) =>
      response.success
        ? resolve(response.data)
        : reject(response.message)
      )
}

export default $unpack
