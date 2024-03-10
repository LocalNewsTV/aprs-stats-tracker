<script setup lang="ts">
  import { computed } from 'vue';
  import AprsEntryType from '../../types/AprsEntryType';

  const jsonContentModel = defineModel<Array<AprsEntryType>>({required: true})
  const totalPackets = computed(() => jsonContentModel.value.length)
  const packetMessage = computed(() => {
    const averageDaily = (furthestDay.value - earliestDay.value) / (24 * 60 * 60 * 1000);
    if (totalPackets.value / averageDaily < 5) { return "Is this thing on?" }
    if (totalPackets.value / averageDaily < 10) { return "You're a fair weather driver, rain cramps your style" }
    if (totalPackets.value / averageDaily < 25) { return "You're getting out there!" }
    return "You're a chatty one, we like that"
  })
  const earliestDay = computed(() => Math.min(...jsonContentModel.value.map((item: AprsEntryType) => item.time)) * 1000);
  const furthestDay = computed(() => Math.max(...jsonContentModel.value.map((item: AprsEntryType) => item.time)) * 1000);
  const fastestSpeed = computed(() => Math.max(...jsonContentModel.value.map((item: AprsEntryType) => item.speed)))
  const speedMessage = computed(() => {
    if (fastestSpeed.value < 15) { return "Moving at a speed that gives snails a run for their money - slow and steady wins the scenic route." }
    if (fastestSpeed.value < 30) { return "Rolling along at the speed of a lazy river - letting the current guide the way."} 
    if (fastestSpeed.value < 50) { return "Maintaining the Goldilocks speed - not too fast, not too slow, just perfect." }
    if (fastestSpeed.value < 90) { return "Cruising at the perfect pace - like a smooth jazz performance on four wheels." }
    return "Zooming down the road at warp speed - did you install a turbo boost on that thing?"
  })
</script>
<!-- // -->
<template>
  <div id="captures-in-period" class="full-container">
    <div class="content-container">
      <p class="big title">Your Journey in Review</p>
      <p>
        "From the kickoff at
        <span class="accent accent-a">{{ new Date(earliestDay).toDateString() }}</span>
        to the triumphant closing act at
        <span class="accent accent-b">{{ new Date(furthestDay).toDateString() }}</span>,
        let's stroll down the memory lane of your journey.
      </p>
      <div class="bump-out">
        <p>You were caught travelling at <span class="accent accent-c">{{ fastestSpeed }}/km!</span></p>
        <p class="flavour-text">{{ speedMessage }}</p>
      </div>
      <div>
        <p>
          In this period, you sent out
          <span class="accent">{{ totalPackets }}</span>
          packets!
          {{ packetMessage }}
        </p>
      </div>
    </div>
  </div>
</template>
<!-- // -->
<style scoped>
  .title { color: white; }
  .big { font-size: 48pt;}
  p { font-size: 24pt; }
  .content-container {
    display: flex;
    flex-direction: column;
    max-width: var(--medium-screen);
  }
  .bump-out { padding-left: 3em;}
  .flavour-text { 
    font-size: 16pt;  
    font-style: italic;
    padding-left: 3em;
  }
  .accent {
    font-size: 28pt;
    font-weight: bold;
  }
  .accent-a { color: red; }
  .accent-b { color: yellow; }
  .accent-c { color:  green; }
  #captures-in-period { background-color: #D85CE6; }
</style>
