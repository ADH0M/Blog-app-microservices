"use client";

import React, { ReactElement, ReactNode, useRef } from "react";
import Try, { type Collection } from "@/components/chat/Try";
import Images from "./Images";

export default function Page() {
  const testRef = useRef<Collection>(null);
  const ref2 = useRef<Collection>(null);

  return (
    <div>
      <Try ref={testRef} action="some-action">
        <button
          onClick={(e) => {
            e.stopPropagation();
            testRef.current?.open!();
          }}
        >
          Toggle from parent
        </button>
      </Try>
      <Images />
      <div className="h-screen">
        <button onClick={()=>{
            ref2.current?.scrollIntoView({
              behavior:'smooth',
              block:'end'
            })
        }}>
          action
        </button>
      </div> 

       <div className="h-screen" ref={ref2}>ref</div>
    </div>
  );
}
