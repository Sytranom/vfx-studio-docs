'use client'; 

import React, { useState } from 'react';
import Image from 'next/image';
import FsLightbox from 'fslightbox-react';

const MdxImage = (props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => {
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    sourceIndex: 0,
  });

  function openLightbox() {
    setLightboxController({
      toggler: !lightboxController.toggler,
      sourceIndex: 0,
    });
  }

  if (!props.src) {
    return null;
  }

  return (
    <>
      <Image
        src={props.src}
        alt={props.alt || ''}
        width={Number(props.width) || 800}
        height={Number(props.height) || 450}
        onClick={openLightbox}
        className="cursor-zoom-in rounded-md border border-border-color my-6"
      />
      <FsLightbox
        toggler={lightboxController.toggler}
        sources={[props.src]}
        sourceIndex={lightboxController.sourceIndex}
      />
    </>
  );
};

export default MdxImage;