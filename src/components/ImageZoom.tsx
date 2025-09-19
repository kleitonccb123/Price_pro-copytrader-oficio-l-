"use client"

import React, { type ImgHTMLAttributes } from "react"
import Zoom, { type UncontrolledProps } from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"
import { cn } from "@/lib/utils"

export interface ImageZoomProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  zoomInProps?: ImgHTMLAttributes<HTMLImageElement>
  zoomProps?: UncontrolledProps
  className?: string
}

function getImageSrc(src: string): string {
  return src
}

export function ImageZoom({
  zoomInProps,
  zoomProps,
  className,
  children,
  src,
  alt,
  ...props
}: ImageZoomProps) {
  return (
    <Zoom
      zoomMargin={20}
      {...zoomProps}
    >
      {children ?? (
        <img
          className={cn(
            "cursor-zoom-in rounded-lg transition-all hover:opacity-90",
            className
          )}
          src={src}
          alt={alt}
          {...props}
        />
      )}
    </Zoom>
  )
}