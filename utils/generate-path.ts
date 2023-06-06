
export function generatePath(modules: Array<Array<boolean>>, margin: number = 0): string {
  const ops: string[] = []
  modules.forEach((row, y) => {
    let start: number | null = null
    row.forEach((cell, x) => {
      if (!cell && start !== null) {
        ops.push(
          `M${start + margin} ${y + margin}h${x - start}v1H${start + margin}z`
        )
        start = null
        return
      }

      if (x === row.length - 1) {
        if (!cell) {
          return
        }

        if (start === null) {
          ops.push(`M${x + margin},${y + margin}h1v1H${x - margin}z`)
        } else {
          ops.push(`M${x + margin},${y + margin} h${x + 1 - start}v1H${start+margin}z`)
        }

        return
      }

      if (cell && start === null) {
        start = x
      }
    })
  })
  return ops.join('')
}