import { onUnmounted } from 'vue'

function useDomcreate (ndoeId: string) {
  const node = document.createElement('div')
  node.id = ndoeId
  document.body.appendChild(node)
  onUnmounted(() => {
    document.body.removeChild(node)
  })
}

export default useDomcreate
