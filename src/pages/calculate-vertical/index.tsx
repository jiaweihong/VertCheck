import React, { ChangeEvent, useRef, useState } from 'react'

export default function calculateVertical() {
  const [videoPlayer, setVideoPlayerSrc] = useState('')
  const [isFpsCalculated, setIsFpsCalculated] = useState(false)
  const [takeoffTime, setTakeoffTime] = useState(0)
  const [landingTime, setLandingTime] = useState(0)
  const [vertical, setVertical] = useState(0)

  const [videoFps, setVideoFps] = useState(0)

  const videoPlayerRef = useRef<HTMLVideoElement | null>(null)

  function uploadVideoHandler(e: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = e.target.files

    if (selectedFiles) {
      const video = selectedFiles[0]
      const url = URL.createObjectURL(video)

      setVideoPlayerSrc(url)
    }
  }

  function getFpsOfVideo() {
    if (isFpsCalculated) {
      return
    }

    let lastMediaTime: number, lastFrameNumber: number
    let maxTick: number = 100
    let timeDiffPerFrameArr: number[] = []

    if (!videoPlayerRef.current) {
      return
    }

    videoPlayerRef.current.play()

    videoPlayerRef.current.requestVideoFrameCallback((now, metadata) => {
      appendTimeDiffPerFrameToArr(
        now,
        metadata,
        lastMediaTime,
        lastFrameNumber,
        timeDiffPerFrameArr,
        maxTick
      )
    })
  }

  function appendTimeDiffPerFrameToArr(
    now: number,
    metadata: { mediaTime: number; presentedFrames: number },
    lastMediaTime: number,
    lastFrameNumber: number,
    timeDiffPerFrameArr: number[],
    maxTick: number
  ) {
    // getting the time difference
    let media_time_diff = Math.abs(metadata.mediaTime - lastMediaTime)
    // getting the number of frames for the above time difference
    let frame_num_diff = Math.abs(metadata.presentedFrames - lastFrameNumber)
    // diff = the avg time diff per frame
    let timeDiffPerFrame = media_time_diff / frame_num_diff

    if (!videoPlayerRef.current) {
      return
    }

    if (
      timeDiffPerFrame &&
      timeDiffPerFrameArr.length < maxTick &&
      videoPlayerRef.current.playbackRate === 1 &&
      document.hasFocus()
    ) {
      timeDiffPerFrameArr.push(timeDiffPerFrame)
    } else if (timeDiffPerFrameArr.length >= maxTick) {
      let fps = Math.round(1 / calAvgTimeDiffPerFrame(timeDiffPerFrameArr))
      setVideoFps(fps)
      setIsFpsCalculated(true)
      videoPlayerRef.current.pause()
      return
    }

    lastMediaTime = metadata.mediaTime
    lastFrameNumber = metadata.presentedFrames

    videoPlayerRef.current.requestVideoFrameCallback((now, metadata) => {
      appendTimeDiffPerFrameToArr(
        now,
        metadata,
        lastMediaTime,
        lastFrameNumber,
        timeDiffPerFrameArr,
        maxTick
      )
    })
  }

  function calAvgTimeDiffPerFrame(timeDiffPerFrameArr: number[]) {
    // Gets the sum of time difference / arr count
    return (
      timeDiffPerFrameArr.reduce((a, b) => a + b) / timeDiffPerFrameArr.length
    )
  }

  function nextFrameHandler() {
    if (videoFps > 0 && videoPlayerRef.current) {
      let videoPlayer: HTMLVideoElement = videoPlayerRef.current
      videoPlayer.currentTime += getSecondsPerFrameRoundUpTo3Dp(videoFps)
    }
  }

  function previousFrameHandler() {
    if (videoFps > 0 && videoPlayerRef.current) {
      let videoPlayer: HTMLVideoElement = videoPlayerRef.current
      videoPlayer.currentTime -= getSecondsPerFrameRoundUpTo3Dp(videoFps)
    }
  }

  function getSecondsPerFrameRoundUpTo3Dp(fps: number) {
    return parseFloat((Math.ceil((1 / fps) * 1000) / 1000).toFixed(3))
  }

  function takeoffHandler() {
    if (videoPlayerRef.current) {
      let videoPlayer: HTMLVideoElement = videoPlayerRef.current
      setTakeoffTime(videoPlayer.currentTime)
    }
  }

  function landingHandler() {
    if (videoPlayerRef.current) {
      let videoPlayer: HTMLVideoElement = videoPlayerRef.current
      setLandingTime(videoPlayer.currentTime)
    }
  }

  function calculateVerticalHandler() {
    const flightTime = landingTime - takeoffTime
    const displacement = 1.22625 * Math.pow(flightTime, 2)
    setVertical(metersToInches1Dp(displacement))
  }

  function metersToInches1Dp(meters: number) {
    const inchesPerMeter = 39.3701
    const inches = meters * inchesPerMeter
    return Math.round(inches * 10) / 10
  }

  return (
    <div className="flex">
      <div>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => uploadVideoHandler(e)}
        />

        <p>fps: {videoFps}</p>

        <video
          className="h-96 w-96"
          onCanPlay={getFpsOfVideo}
          src={videoPlayer}
          ref={videoPlayerRef}
          controls
        >
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="flex flex-col pt-20">
        <button
          className="h-14 bg-yellow-500 text-lg font-bold uppercase hover:bg-yellow-600"
          onClick={() => {
            nextFrameHandler()
          }}
        >
          Next frame
        </button>

        <button
          className="h-14  bg-yellow-500 text-lg font-bold uppercase hover:bg-yellow-600"
          onClick={() => {
            previousFrameHandler()
          }}
        >
          Previous frame
        </button>

        <button
          className="h-14 bg-yellow-500 text-lg font-bold uppercase hover:bg-yellow-600"
          onClick={() => {
            takeoffHandler()
          }}
        >
          Takeoff
        </button>

        <button
          className="h-14 bg-yellow-500 text-lg font-bold uppercase hover:bg-yellow-600"
          onClick={() => {
            landingHandler()
          }}
        >
          landing
        </button>

        <button
          className="h-14 bg-yellow-500 text-lg font-bold uppercase hover:bg-yellow-600"
          onClick={() => {
            calculateVerticalHandler()
          }}
        >
          Calculate vertical
        </button>
      </div>

      <div className="flex w-96 flex-col items-center text-2xl">
        <p>Statistic</p>

        <p>Takeoff: {takeoffTime}s</p>
        <p>Landing: {landingTime}s</p>
        <p>Vertical Jump: {vertical}"</p>
      </div>
    </div>
  )
}

/**
 * Workflow:
 * User uploads video file
 * Script will run to play video in the background and calculate the framerate of the video
 * While calculating framerate it does a spinner
 * On complete it will display video output, with start of jump btn, end of jump btn, forward 1 frame, go back 1 frame
 */
