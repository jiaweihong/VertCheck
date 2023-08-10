import React, { ChangeEvent, useRef, useState } from 'react'

export default function calculateVertical() {
  const [videoPlayer, setVideoPlayerSrc] = useState('')
  const [videoFps, setVideoFps] = useState(0)
  const [isCalculatingFps, setIsCalculatingFps] = useState(false)
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null)

  function uploadVideoHandler(e: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = e.target.files

    if (selectedFiles) {
      const video = selectedFiles[0]
      const url = URL.createObjectURL(video)

      setVideoPlayerSrc(url)
    }
  }

  function playGetFpsVideo() {
    let last_media_time: number, last_frame_num: number
    let maxTick: number = 50
    let timeDiffPerFrameArr: number[] = []
    let fps: number

    if (!videoPlayerRef.current) {
      return
    }

    videoPlayerRef.current.play()

    videoPlayerRef.current.requestVideoFrameCallback(
      appendTimeDiffPerFrameToArr
    )

    function appendTimeDiffPerFrameToArr(
      time: number,
      metadata: { mediaTime: number; presentedFrames: number }
    ) {
      // getting the time difference
      let media_time_diff = Math.abs(metadata.mediaTime - last_media_time)
      // getting the number of frames for the above time difference
      let frame_num_diff = Math.abs(metadata.presentedFrames - last_frame_num)
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
        fps = Math.round(1 / calAvgTimeDiffPerFrame())
        setVideoFps(fps)
        videoPlayerRef.current.pause()
        return
      }

      last_media_time = metadata.mediaTime
      last_frame_num = metadata.presentedFrames

      videoPlayerRef.current.requestVideoFrameCallback(
        appendTimeDiffPerFrameToArr
      )
    }

    function calAvgTimeDiffPerFrame() {
      // Gets the sum of time difference / arr count
      return (
        timeDiffPerFrameArr.reduce((a, b) => a + b) / timeDiffPerFrameArr.length
      )
    }
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
        onCanPlay={playGetFpsVideo}
        src={videoPlayer}
        ref={videoPlayerRef}
        controls
      >
        Your browser does not support the video tag.
      </video>
      <p>{videoFps}</p>
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
