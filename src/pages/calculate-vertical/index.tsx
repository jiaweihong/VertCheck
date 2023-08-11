import { time } from 'console'
import React, { ChangeEvent, useRef, useState } from 'react'

export default function calculateVertical() {
  const [videoPlayer, setVideoPlayerSrc] = useState('')
  const [isFpsCalculated, setIsFpsCalculated] = useState(false)
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
    let maxTick: number = 50
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

  return (
    <div className="flex">
      <input
        type="file"
        accept="video/*"
        onChange={(e) => uploadVideoHandler(e)}
      />

      <video
        className="h-96 w-96"
        onCanPlay={getFpsOfVideo}
        src={videoPlayer}
        ref={videoPlayerRef}
        controls
      >
        Your browser does not support the video tag.
      </video>
      <p>{videoFps}</p>
      <button
        onClick={() => {
          nextFrameHandler()
        }}
      >
        Next frame
      </button>
      <button
        onClick={() => {
          previousFrameHandler()
        }}
      >
        Previous frame
      </button>
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
