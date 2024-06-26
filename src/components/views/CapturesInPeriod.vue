<script setup lang="ts">
  import { computed } from 'vue';
  import AprsEntryType from '../../types/AprsEntryType';
  import rocket from '/rocket.svg';
  import chatheart from '/chat-heart.svg';
  import speedometer from '/speedometer.svg';
  import broadcastPin from '/broadcast-pin.svg';

  const jsonContentModel = defineModel<Array<AprsEntryType>>({required: true})
  const totalPackets = computed(() => jsonContentModel.value.length)
  const packetMessage = computed(() => {
    const averageDaily = (furthestDay.value - earliestDay.value) / (24 * 60 * 60 * 1000);
    if (totalPackets.value / averageDaily < 5) { return "Is this thing on?" }
    if (totalPackets.value / averageDaily < 10) { return "You're a fair weather driver, rain cramps your style" }
    if (totalPackets.value / averageDaily < 25) { return "We hear you calling!" }
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
    <img :src="broadcastPin" class="background" />
    <div class="content-container">
      <p class="big title">Your Journey in Review <img class="rocket" :src="rocket" /></p>
      <p>
        From the kickoff at
        <span class="accent accent-a">{{ new Date(earliestDay).toDateString() }}</span>
        to the triumphant closing act at
        <span class="accent accent-b">{{ new Date(furthestDay).toDateString() }}</span>,
        let's stroll down the memory lane of your journey.
      </p>
      <div class="bump-out">
        <div class="small-flex">
          <img :src=speedometer />
          <div>
            <p>
              You were caught travelling at
              <span class="accent accent-c">{{ fastestSpeed }}/km!&nbsp;</span>
            </p>
            <p class="flavour-text italic">{{ speedMessage }}</p>
          </div>
        </div>
        <div class="small-flex">
        <img :src="chatheart" />&nbsp;
          <p>
            You sent
            <span class="accent">{{ totalPackets }}</span>
            packets!
            <span class="italic">{{ packetMessage }}</span>
          </p>
      </div>
      </div>
    </div>
  </div>
</template>
<!-- // -->
<style scoped>
  .big {
    font-size: 28pt;
    text-align: center;
  }
  .title { 
    color: white;
    display: flex;
    align-items: center;
  }
  .full-container {background-color: inherit;}
  .accent-a { color: black; }
  .accent-b { color: black; }
  .accent-c { color: black; }
  .italic { font-style: italic; }
  .flavour-text { font-size: 13pt; }

  .small-flex {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row-reverse;
  }
  img {
    height: 48pt;
    width: 48pt;
    margin-right: 1em;
  }
  .rocket {
    display: none;
  }

  p {
    text-align: left; 
    font-size: 16pt;
  }
  .content-container {
    display: flex;
    flex-direction: column;
    max-width: var(--medium-screen);
    z-index: 3;
  }

  .accent {
    font-size: 18pt;
    font-weight: bold;
  }
  .background {
    position: absolute; 
    height: 200pt;
    width: 200pt;
    right: 4em;
    bottom: 4em;
  }

  #captures-in-period {
    background-color: #D85CE6;
    z-index: 1;
    position: relative;
    padding: 2em 0.5em;
    box-sizing: border-box;
    justify-content: flex-start;
  }
  @media screen and (min-width: 720pt) {
    .accent {
      font-size: 28pt;
    }
    .title img {
      margin-left: 10pt;
    }
    #captures-in-period { justify-content: center; }
    .rocket { display: block; }
    .big { font-size: 52pt;}
    .background {
      height: 350pt;
      width: 350pt;
    }
    .bump-out { padding-left: 3em;}
    .flavour-text { 
      font-size: 16pt;  
      padding-left: 3em;
    }
    .small-flex {
      justify-content: flex-start;
    }
    p { font-size: 24pt; }
  }
</style>
