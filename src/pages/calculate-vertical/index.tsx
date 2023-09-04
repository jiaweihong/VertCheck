import React, { ChangeEvent, useRef, useState } from 'react'
import { SquareLoader } from 'react-spinners'

export default function CalculateVertical() {
  const [videoPlayer, setVideoPlayerSrc] = useState('')
  const [isFpsCalculated, setIsFpsCalculated] = useState(false)
  const [isVideoUploading, setIsVideoUploading] = useState(false)
  const [videoTitle, setVideoTitle] = useState('')
  const [takeoffTime, setTakeoffTime] = useState(0)
  const [landingTime, setLandingTime] = useState(0)
  const [vertical, setVertical] = useState(0)
  const [videoFps, setVideoFps] = useState(0)

  const videoPlayerRef = useRef<HTMLVideoElement | null>(null)
  const videoPlayerForFpsRef = useRef<HTMLVideoElement | null>(null)

  function resetStates() {
    setVideoPlayerSrc('')
    setIsFpsCalculated(false)
    setIsVideoUploading(false)
    setVideoTitle('')
    setTakeoffTime(0)
    setLandingTime(0)
    setVertical(0)
    setVideoFps(0)
  }

  function uploadVideoHandler(e: ChangeEvent<HTMLInputElement>) {
    resetStates()

    const selectedFiles = e.target.files

    if (selectedFiles && selectedFiles.length > 0) {
      const video = selectedFiles[0]
      setVideoTitle(video.name)
      const url = URL.createObjectURL(video)

      setVideoPlayerSrc(url)
      setIsVideoUploading(true)
    }
  }

  function getFpsOfVideo() {
    if (isFpsCalculated) {
      return
    }

    let lastMediaTime: number, lastFrameNumber: number
    let maxTick: number = 100
    let timeDiffPerFrameArr: number[] = []

    if (!videoPlayerForFpsRef.current) {
      return
    }

    videoPlayerForFpsRef.current.play()

    videoPlayerForFpsRef.current.requestVideoFrameCallback((now, metadata) => {
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

    if (!videoPlayerForFpsRef.current) {
      return
    }

    if (
      timeDiffPerFrame &&
      timeDiffPerFrameArr.length < maxTick &&
      videoPlayerForFpsRef.current.playbackRate === 1 &&
      document.hasFocus()
    ) {
      timeDiffPerFrameArr.push(timeDiffPerFrame)
    } else if (timeDiffPerFrameArr.length >= maxTick) {
      let fps = Math.round(1 / calAvgTimeDiffPerFrame(timeDiffPerFrameArr))
      setVideoFps(fps)
      setIsFpsCalculated(true)
      setIsVideoUploading(false)
      videoPlayerForFpsRef.current.pause()
      return
    }

    lastMediaTime = metadata.mediaTime
    lastFrameNumber = metadata.presentedFrames

    videoPlayerForFpsRef.current.requestVideoFrameCallback((now, metadata) => {
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

  function round2Dp(number: number) {
    return Math.round(number * 100) / 100
  }

  return (
    <div className="flex flex-col items-center rounded bg-[#f1f0f0] py-10 text-[#19323C] lg:flex-row lg:flex-wrap lg:justify-center">
      <div className="mb-8 flex min-h-[750px] w-[90%] flex-col bg-white p-8 lg:ml-[5%] lg:max-w-[1100px] lg:shrink lg:flex-grow lg:basis-[55%]">
        <div className="flex items-center py-4">
          <input
            id="inputVideoBtn"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => uploadVideoHandler(e)}
          />
          <label
            className="mr-4 rounded border-2 border-[#222660] bg-transparent px-4 py-2 font-semibold text-[#222660] hover:cursor-pointer hover:border-transparent hover:bg-[#222660] hover:text-white"
            htmlFor="inputVideoBtn"
          >
            Upload Video
          </label>
        </div>

        <div className="flex justify-between text-2xl">
          <p>Video: {videoTitle}</p>
          <p>FPS: {videoFps}</p>
        </div>

        <div className="flex h-[500px] w-full flex-col items-center justify-center">
          <video
            className="hidden"
            onCanPlay={getFpsOfVideo}
            src={videoPlayer}
            ref={videoPlayerForFpsRef}
            muted={true}
            controls
          >
            Your browser does not support the video tag.
          </video>

          {isVideoUploading && (
            <SquareLoader
              color="#CD2444"
              loading={isVideoUploading}
              size={150}
            />
          )}
          {!isVideoUploading && (
            <video
              className="h-full w-full"
              src={videoPlayer}
              ref={videoPlayerRef}
              controls
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        <div className="flex flex-wrap justify-between bg-white py-4 text-lg">
          <button
            className="min-w-[150px] rounded border border-[#222660] bg-transparent px-4 py-2 font-semibold text-[#222660] hover:border-transparent hover:bg-[#222660] hover:text-white"
            onClick={() => {
              previousFrameHandler()
            }}
          >
            Previous frame
          </button>

          <button
            className="min-w-[150px] rounded border border-[#222660] bg-transparent px-4 py-2 font-semibold text-[#222660] hover:border-transparent hover:bg-[#222660] hover:text-white"
            onClick={() => {
              takeoffHandler()
            }}
          >
            Takeoff
          </button>

          <button
            className="min-w-[150px] rounded border border-[#222660] bg-transparent px-4 py-2 font-semibold text-[#222660] hover:border-transparent hover:bg-[#222660] hover:text-white"
            onClick={() => {
              landingHandler()
            }}
          >
            Landing
          </button>

          <button
            className="min-w-[150px] rounded border border-[#222660] bg-transparent px-4 py-2 font-semibold text-[#222660] hover:border-transparent hover:bg-[#222660] hover:text-white"
            onClick={() => {
              nextFrameHandler()
            }}
          >
            Next frame
          </button>

          <button
            className="min-w-[150px] rounded border border-[#222660] bg-transparent px-4 py-2 font-semibold text-[#222660] hover:border-transparent hover:bg-[#222660] hover:text-white"
            onClick={() => {
              calculateVerticalHandler()
            }}
          >
            Calculate
          </button>
        </div>
      </div>

      <div className="mb-8 flex min-h-[750px] w-[90%] flex-col items-center justify-center rounded bg-white p-8 text-2xl lg:ml-10 lg:mr-[5%] lg:max-w-[300px] lg:shrink lg:flex-grow lg:basis-[25%]">
        <h2 className="border-b-2 border-[#CD2444] pb-2 text-center text-3xl">
          Results
        </h2>

        <div className="flex flex-col items-center text-center">
          <div className="flex h-32  flex-col items-center justify-center">
            <p>{round2Dp(takeoffTime)}s</p>
            <p className="text-[#CD2444]">Takeoff</p>
          </div>
          <div className="flex h-32  flex-col items-center justify-center">
            <p>{round2Dp(landingTime)}s</p>
            <p className="text-[#CD2444]">Landing</p>
          </div>
          <div className="flex h-32  flex-col items-center justify-center">
            <p>
              {landingTime - takeoffTime > 0
                ? round2Dp(landingTime - takeoffTime)
                : 0}
              s
            </p>
            <p className="text-[#CD2444]">Flight Time</p>
          </div>
          <div className="flex h-32  flex-col items-center justify-center">
            <p>{vertical}&quot;</p>
            <p className="text-[#CD2444]">Vertical Jump</p>
          </div>
        </div>
      </div>

      <div className="w-[90%] bg-white p-8 lg:max-w-[1440px]">
        <h2 className="pb-4 text-2xl text-[#CD2444]">
          How to calculate your vertical jump height:
        </h2>

        <ol className="list-outside list-decimal pl-5 text-xl">
          <li className="pb-1">
            Upload a video that is a minimum of 5 seconds. This allows the
            software to count the frames per second (fps) of the video to allow
            frame by frame skipping.
          </li>
          <li className="pb-1">
            Play the video and find the point where your feet just leaves the
            ground, then press the &apos;Takeoff&apos; button.
          </li>
          <li className="pb-1">
            When your foot touches the ground again, press the
            &apos;Landing&apos; button.
          </li>
          <li className="pb-1">
            Press the &apos;Calclate&apos; button to get your vertical jump
            height in inches.
          </li>
        </ol>
      </div>
    </div>
  )
}
