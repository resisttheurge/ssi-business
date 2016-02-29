export default function($resource, $endpoint) {
  return $resource(`${$endpoint}/auth`, {}, {
    login: { method: 'POST' }
  })
}
