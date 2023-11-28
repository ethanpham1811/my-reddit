/**
 * Mocked Upload file classes
 * - File
 * - FileList
 * - DataTransfer
 * - DataTransferItemList
 */
global.File = class {
  constructor(parts, filename, options) {
    this.parts = parts
    this.filename = filename
    this.options = options
  }
}

global.FileList = class {
  constructor(files) {
    this.length = files.length
  }
}

global.DataTransfer = class {
  constructor() {
    this.items = new global.DataTransferItemList(this)
  }

  setFiles() {
    this.files = new FileList(this.items.getFiles())
  }
}

global.DataTransferItemList = class {
  constructor(dataTransfer) {
    this.items = []
    this.dataTransfer = dataTransfer
  }

  add(file) {
    this.items.push(file)
    this.dataTransfer.setFiles()
  }

  getFiles() {
    return this.items
  }
}
