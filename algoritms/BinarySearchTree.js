class BinarySearchTree {
   constructor() {
     this.root = null
     this.path = []
   }
 
   insert(value) {
     var newNode = new Node(value)
 
     if (this.root === null) {
       this.root = newNode
     } else {
       this.insertNode(this.root, newNode)
     }
   }
 
   insertNode(node, newNode) {
     if (newNode.value < node.value) {
       if (node.left === null) {
         node.left = newNode
       } else {
         this.insertNode(node.left, newNode)
       }
     } else {
       if (node.right === null) {
         node.right = newNode
       } else {
         this.insertNode(node.right, newNode)
       }
     }
   }
 
   remove(value) {
     this.root = this.removeNode(this.root, value)
   }
 
   removeNode(node, key) {
     if (node === null) {
       return null
     } else if (key < node.value) {
       node.left = this.removeNode(node.left, key)
       return node
     } else if (key > node.value) {
       node.right = this.removeNode(node.right, key)
       return node
     } else {
       if (node.left === null && node.right === null) {
         node = null
         return node
       }
       if (node.left === null) {
         node = node.right
         return node
       } else if (node.right === null) {
         node = node.left
         return node
       }
       var aux = this.findMinNode(node.right)
       node.value = aux.value
       node.right = this.removeNode(node.right, aux.value)
       return node
     }
   }
 
   findMinMode(node) {
     if (node.left === null) {
       return node
     } else {
       return this.findMinNode(node.left)
     }
   }
 
   getRootNode() {
     return this.root
   }
 
   inorder(node) {
     if (node !== null) {
       this.inorder(node.left)
       console.log(node.value)
       this.inorder(node.right)
     }
   }
 
   search(node, value, initial = false) {
     if (initial) {
       this.path = []
     }
     if (node === null) {
       return null
     } else if (value < node.value) {
       this.path.push(node.value)
       return this.search(node.left, value)
     } else if (value > node.value) {
       this.path.push(node.value)
       return this.search(node.right, value)
     } else {
       this.path.push(node.value)
       return node
     }
   }
 
   getPath() {
     return this.path
   }
 
   getSearchPath(value) {
     this.search(this.root, value, true)
     return this.getPath()
   }
 }