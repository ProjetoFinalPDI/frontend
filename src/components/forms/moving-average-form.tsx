import {
  MA_N_MIN,
  MA_N_MAX,
  MA_N_STEP,
  MA_B_MIN,
  MA_B_MAX,
  MA_B_STEP,
} from "@/constants/segmentation";
import useLanguage from "@/hooks/use-language";
import { MovingAverage } from "@/types/parameters";

type Props = {
  state: MovingAverage;
  dispatcher: React.Dispatch<any>;
};

const MovingAverageForm = ({ state, dispatcher }: Props) => {
  const { text } = useLanguage();
  return (
    <>
      <div className="flex items-center justify-between">
        <p>{text.numberPoints}:</p>

        <input
          className="w-1/3"
          type="number"
          min={MA_N_MIN}
          max={MA_N_MAX}
          step={MA_N_STEP}
          value={state.n}
          onChange={(e) =>
            dispatcher({
              type: "SET_PARAM",
              key: "n",
              value: Number(e.target.value),
            })
          }
        />
      </div>

      <div className="flex flex-col gap-0.5">
        <p>{text.adjustFactor}:</p>

        <div className="flex items-center justify-between">
          <input
            className="w-1/3"
            type="range"
            min={MA_B_MIN}
            max={MA_B_MAX}
            step={MA_B_STEP}
            value={state.b}
            onChange={(e) =>
              dispatcher({
                type: "SET_PARAM",
                key: "b",
                value: Number(e.target.value),
              })
            }
          />
          <p>{state.b}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p>{text.applyInterpolation}:</p>

        <input
          type="checkbox"
          checked={state.applyInterpolation}
          onChange={(e) =>
            dispatcher({
              type: "SET_PARAM",
              key: "applyInterpolation",
              value: e.target.checked,
            })
          }
        />
      </div>
    </>
  );
};

export default MovingAverageForm;
