class UploadFileService {
  async execute({ file }: any) {
    try {
      const imageUrl = `http://localhost:8000/uploads/${file.filename}`
      
      return imageUrl
    } catch (error: any) {
      throw new Error("Error while processing file upload")
    }
  }
}
export { UploadFileService }