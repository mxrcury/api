import '@types/multer'

export interface Response {
  url?: string
  status: number
}

export abstract class FileStorage {
  abstract save(file: Express.Multer.File): Promise<Response>
  abstract delete(key: string): Promise<Response>
}
