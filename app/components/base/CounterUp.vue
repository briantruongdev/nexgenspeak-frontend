<script setup lang="ts">
interface CounterProps {
  start?: number
  end: number
  duration?: number
  threshold?: number
  suffix?: string
  prefix?: string
  decimals?: number
  easing?: 'linear' | 'easeOutExpo' | 'easeInOutQuad'
}

const props = withDefaults(defineProps<CounterProps>(), {
  start: 0,
  duration: 1000,
  threshold: 0.2,
  suffix: '+',
  prefix: '',
  decimals: 0,
  easing: 'easeOutExpo'
})

const emit = defineEmits<{
  start: []
  complete: []
}>()

const counterRef = ref<HTMLElement | null>(null)
const count = ref<number>(props.start)
const inViewport = ref<boolean>(false)

let observer: IntersectionObserver | null = null
let animationFrameId: number | null = null

const easingFunctions = {
  linear: (t: number): number => t,
  easeOutExpo: (t: number): number => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeInOutQuad: (t: number): number => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)
}

const formatNumber = (num: number): string => {
  return num.toFixed(props.decimals)
}

const handleIntersection = (entries: IntersectionObserverEntry[]): void => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !inViewport.value) {
      inViewport.value = true
      startCounter()
    }
  })
}

const startCounter = (): void => {
  emit('start')

  let startTime: number | null = null
  const startValue = props.start
  const endValue = props.end
  const diff = endValue - startValue
  const easingFn = easingFunctions[props.easing]

  const step = (timestamp: number): void => {
    if (!startTime) startTime = timestamp

    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / props.duration, 1)

    const easedProgress = easingFn(progress)

    const currentValue = startValue + diff * easedProgress
    count.value = Number(formatNumber(currentValue))

    if (progress < 1 && inViewport.value) {
      animationFrameId = requestAnimationFrame(step)
    } else {
      count.value = endValue
      emit('complete')
    }
  }

  animationFrameId = requestAnimationFrame(step)
}

const stopCounter = (): void => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
}

const reset = (): void => {
  stopCounter()
  count.value = props.start
  inViewport.value = false
}

const trigger = (): void => {
  if (!inViewport.value) {
    inViewport.value = true
    startCounter()
  }
}

onMounted(() => {
  if (counterRef.value) {
    observer = new IntersectionObserver(handleIntersection, {
      threshold: props.threshold,
      rootMargin: '0px'
    })
    observer.observe(counterRef.value)
  }
})

onBeforeUnmount(() => {
  stopCounter()
  if (observer) {
    observer.disconnect()
    observer = null
  }
})

defineExpose({
  reset,
  trigger,
  stop: stopCounter
})
</script>

<template>
  <span ref="counterRef" class="count-text"> {{ prefix }}{{ count }}{{ suffix }} </span>
</template>

<style scoped>
.count-text {
  display: inline-block;
  font-variant-numeric: tabular-nums;
  /* Ensures consistent digit width */
}
</style>
