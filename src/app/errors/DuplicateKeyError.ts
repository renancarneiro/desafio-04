export default (nameError: string[]) => {
  return {
    message: 'DuplicateKeyError',
    details: `${nameError} must be unique`
  }
}
