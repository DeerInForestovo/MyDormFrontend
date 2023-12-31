<script setup>
import {ref} from "vue";
import {throttle} from "lodash"

import yuzu from '@/assets/yuzu.png'
import alice from '@/assets/alice.png'
import midori from '@/assets/midori.png'
import momoi from '@/assets/momoi.png'
import mmpointing from '@/assets/midori_momoi_pointing.png'
import mmsleep from '@/assets/midori_momoi_sleep.png'

const active = ref(0)
const animationTime = 2000  // ms
const next = () => {
  if (++active.value > 3) active.value = 0
}
const handleScroll = throttle((e) => {
  console.log(e)
  if (e.deltaY > 0) next()
  else if (active.value) active.value--
}, animationTime)
const jumpToAuthor = () => {
  window.open('https://www.pixiv.net/users/87936502', '_blank')
}
const handleClose = (done) => {
  active.value = 0
  done()
}
</script>

<template>
  <el-drawer
      :size="'80%'"
      :title="'Introduction to Dormitory Selection Process'"
      :before-close="handleClose"
  >
    <el-steps
        class="StepBar"
        :active="active"
        finish-status="success"
    >
      <el-step title="Start"/>
      <el-step title="Team-up"/>
      <el-step title="Select"/>
    </el-steps>

    <div
        class="Step"
        v-show="active===0"
        @wheel="handleScroll"
    >
      <el-row>
        <el-col>
          <p class="Words">Click "next" or scroll your mouse wheel</p>
          <p class="Words">Author of the images:
            <el-button :type="'primary'"
                       link
                       @click="jumpToAuthor"
                       class="Words"
            >
              Here
            </el-button>
          </p>
          <el-image :src="mmpointing" class="Images"></el-image>
        </el-col>
      </el-row>
    </div>

    <div
        class="Step"
        v-show="active===1"
        @wheel="handleScroll"
    >
      <el-row>
        <el-col :span="8">
          <Transition name="Step0" class="Step0">
            <p v-if="active===1" class="WordsLarger">Create a team</p>
          </Transition>

          <Transition name="Step1" class="Step1">
            <p v-if="active===1" class="WordsLarger">Invite your roommates</p>
          </Transition>

          <Transition name="Step2" class="Step2">
            <p v-if="active===1" class="WordsLarger">Ready for room selection</p>
          </Transition>
        </el-col>
        <el-col :span="4">
          <Transition name="Image0" class="Image0">
            <p v-if="active===1" class="WordsOnImages">Leader</p>
          </Transition>
          <Transition name="Image0" class="Image0">
            <el-image :src="yuzu" class="Images" v-if="active===1"/>
          </Transition>
        </el-col>
        <el-col :span="12">
          <Transition name="Image1" class="Image1">
            <p v-if="active===1" class="WordsOnImages">Members</p>
          </Transition>
          <Transition name="Image1" class="Image1">
            <el-image :src="midori" class="Images" v-if="active===1"/>
          </Transition>
          <Transition name="Image1" class="Image1">
            <el-image :src="momoi" class="Images" v-if="active===1"/>
          </Transition>
        </el-col>
      </el-row>
    </div>

    <div
        class="Step"
        v-show="active===2"
        @wheel="handleScroll"
    >
      <el-row>
        <el-col :span="8">
          <Transition name="Step0" class="Step0">
            <p v-if="active===2" class="WordsLarger">Choose a room</p>
          </Transition>
          <Transition name="Step0" class="Step0">
            <p v-if="active===2" class="Words">The <span style="color: red">team leader</span> chooses a room <span
                style="color: red">sized equal to</span> the team</p>
          </Transition>

          <Transition name="Step1" class="Step1">
            <p v-if="active===2" class="Words">If necessary, change the team member</p>
          </Transition>
        </el-col>
        <el-col :span="16">
          <el-row>
            <el-col :span="6">
              <Transition name="Image0" class="Image0">
                <p v-if="active===2" class="WordsOnImages">Leader</p>
              </Transition>
              <Transition name="Image0" class="Image0">
                <el-image :src="yuzu" class="Images" v-if="active===2"/>
              </Transition>
            </el-col>
            <el-col :span="18">
              <Transition name="Image0" class="Image0">
                <p v-if="active===2" class="WordsOnImages">Members</p>
              </Transition>
              <Transition name="Image0" class="Image0">
                <el-image :src="midori" class="Images" v-if="active===2"/>
              </Transition>
              <Transition name="Image0" class="Image0">
                <el-image :src="momoi" class="Images" v-if="active===2"/>
              </Transition>
              <Transition name="Image1" class="Image1">
                <el-image :src="alice" class="Images" v-if="active===2"/>
              </Transition>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <Transition name="Word0" class="Word0">
                <h1 style="color: grey; font-family: 'Bradley Hand ITC', serif" v-if="active===2">Room For 3</h1>
              </Transition>
              <Transition name="Word1" class="Word1">
                <h1 style="color: green; font-family: 'Bradley Hand ITC', serif" v-if="active===2">Room For 4</h1>
              </Transition>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <div
        class="Step"
        v-show="active===3"
        @wheel="handleScroll"
    >
      <el-row>
        <el-col>
          <p class="WordsLarger">Congratulations!</p>
          <p class="Words">Enjoy your room</p>
          <el-image :src="mmsleep" style="width: 50vh"/>
        </el-col>
      </el-row>
    </div>

    <el-button @click="next" v-if="active===3" type="primary" round plain class="Buttons"> Back</el-button>
    <el-button @click="next" v-else type="primary" round plain class="Buttons"> Next</el-button>

  </el-drawer>
</template>

<style scoped>
.Buttons {
}

.Words {
  font-size: large;
}

.WordsOnImages {
  font-size: x-large;
  font-weight: bolder;
}

.WordsLarger {
  font-size: large;
  font-weight: bolder;
}

.Images {
  width: 10vw;
}

.StepBar {
  width: 80%;
}

.Step {
  height: 70vh;
}

.Image0-enter-active, .Image1-enter-active, .Step0-enter-active, .Step1-enter-active, .Step2-enter-active {
  transition: all 1.5s;
}

.Image0-enter-from, .Image1-enter-from, .Step0-enter-from, .Step1-enter-from, .Step2-enter-from {
  opacity: 0;
}

.Word0 {
  animation: green-grey 3s;
}

@keyframes green-grey {
  0% {
    color: green
  }
  50% {
    color: green
  }
  100% {
    color: grey
  }
}

.Word1 {
  animation: grey-green 3s;
}

@keyframes grey-green {
  0% {
    color: grey
  }
  50% {
    color: grey
  }
  100% {
    color: green
  }
}

.Step1, .Image1 {
  transition-delay: 1.5s;
}

.Step2 {
  transition-delay: 3s;
}

</style>