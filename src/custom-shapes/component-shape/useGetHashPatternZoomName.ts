import { useCallback } from "react";
import {
  useSharedSafeId,
  type TLDefaultColorTheme,
  suffixSafeId,
} from "tldraw";

export function useGetHashPatternZoomName() {
  const id = useSharedSafeId("hash_pattern");
  return useCallback(
    (zoom: number, theme: TLDefaultColorTheme["id"]) => {
      const lod = 1;
      return suffixSafeId(id, `${theme}_${lod}`);
    },
    [id]
  );
}
