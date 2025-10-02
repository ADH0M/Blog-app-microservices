import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

type Props = {
  action: string;
  children: ReactNode;
};

export type Collection = HTMLDivElement & {
  open?: () => void;
  close?: () => void;
  st ?: ()=>boolean;
};

const Try = forwardRef<Collection, Props>((props, ref) => {
  const btnRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState(false);

  useImperativeHandle(ref, () => {
    const node = btnRef.current!;
    return Object.assign(node, {
      open: () => {
        setState((prev) => !prev);
      },
      close: () => {
        setState(false);
      },
      st :()=>state
    });
  });

  useEffect(() => {
    const handleClose = (e:MouseEvent) => {
      if(state && !btnRef.current?.contains(e.target as Node)){
        setState(false);

      }
    };

    if (state) {
      document.addEventListener("mousedown", handleClose);
    };

    return ()=>{
      document.removeEventListener("mousedown", handleClose);
    };
  }, [state]);
  return (
    <div ref={btnRef} className="bg-gray-400">
      <div className="bg-red-400">{props.children}</div>

      <div className="h-96 mt-20">{state ? <div>is open </div> : <div>is close </div>}</div>
    </div>
  );
});

Try.displayName = "TryComponent";

export default Try;
