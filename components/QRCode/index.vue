<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script lang="ts" setup>
import { ErrorCorrectLevel} from '~/const/ErrorCorrectLevel';

const canvasRef = ref<HTMLCanvasElement>()
const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  qulityLevel: {
    type: Object as PropType<qrcodegen.QrCode.Ecc>,
    default: () => null,
  },
  margin: {
    type: Number,
    default: 0
  },
  size: {
    type: Number,
    default: 100,
  },
  background: {
    type: String,
    default: '#fff',
  },
  foreground: {
    type: String,
    default: '#000',
  },
})
onMounted(() => {
  if (!props.value) return
  const { margin, size, background, foreground } = props
  const canvas = unref(canvasRef)
  if (!canvas) return 
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  const cells = qrcodegen.QrCode.encodeText(props.value, props.qulityLevel).getModules()
  console.log(cells);
  
  const numCells = cells.length + margin * 2

  const devicePixelRatio = window.devicePixelRatio || 1
  const scale = (size / numCells) * devicePixelRatio
  canvas.height = canvas.width = size * devicePixelRatio
  ctx.scale(scale, scale)
  ctx.fillStyle = background
  ctx.fillRect(0, 0, numCells, numCells)
  
  ctx.fillStyle = foreground
  if (supportsPath2D()) {
    ctx.fill(new Path2D(generatePath(cells, margin)))
  } else {
    cells.forEach((row, rdx) => {
      row.forEach((cell, cdx) => {
        if (cell) {
          ctx.fillRect(cdx + margin, rdx + margin, 1, 1)
        }
      })
    })
  }
})
</script>