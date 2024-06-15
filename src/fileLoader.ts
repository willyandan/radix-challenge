import path from 'path'
import fs from 'fs'

const loadControllers = async () => {
  const folder = path.join(__dirname, '/application/controller')
  const files = fs.readdirSync(folder)
  for (const file of files) {
    const filePath = path.join(folder, file)
    await import(filePath)
  }
}

const loadRepos = async () => {
  const folder = path.join(__dirname, '/infra/repositories')
  const files = fs.readdirSync(folder)
  for (const file of files) {
    const filePath = path.join(folder, file)
    await import(filePath)
  }
}

export const loadFiles = async () => {
  await loadControllers()
  await loadRepos()
}
