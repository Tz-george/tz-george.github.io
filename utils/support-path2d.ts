let support = false

export function supportsPath2D(): boolean {
  if (support) { return true }
  
  try {
    new Path2D().addPath(new Path2D())
  } catch (e) {
    support = false
    return false
  }

  support = true
  return true
}