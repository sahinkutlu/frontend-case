import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { optionItem } from "../redux/optionSlice";


function Select() {

  const optionList = useSelector((state: RootState) => state.optionReducer.list)

  const [bufList, setBufList] = useState<optionItem[]>([]);

  const [selectedIndex, setIndexList] = useState<number[]>([]);

  useEffect(() => {

    setBufList(optionList)

  }, [optionList])

  const onChange = (e: HTMLInputElement, i: number) => {

    let updatedBufList = [...bufList];

    updatedBufList[i] = { ...updatedBufList[i], selected: e.checked };

    setBufList(updatedBufList)

    if (e.checked == true) {
      setIndexList([...selectedIndex, i]);
    }
    else {

      let buf = [...selectedIndex];

      const _index = selectedIndex.findIndex((index: number) => index == i);

      if (_index != undefined && _index > -1)
        buf.splice(_index, 1);

      setIndexList(buf);
    }
  }

  const onClick = () => {

    console.log("enes")
    if (selectedIndex.length > 0) {

      let updatedBufList = [...bufList];
      let newIndxList: number[] = [];

      let cnt = 0;

      selectedIndex.forEach(k => {

        let temp = updatedBufList[k];

        updatedBufList[k] = updatedBufList[cnt];
        updatedBufList[cnt] = temp;

        newIndxList = [...newIndxList, cnt]

        cnt = cnt + 1

      });

      setBufList(updatedBufList);
      setIndexList(newIndxList);

    }
  }

  return (
    <div className="select-container">
      <table>
        <tbody>
          <tr >

            {
              bufList.map((option, i) => (
                <div key={i} className="select-item">
                  <div>
                    <input onChange={(e) => { onChange(e.target, i) }} type="checkbox" checked={option.selected} />
                  </div>
                  <div>
                    <label>{option.name}</label>
                  </div>
                </div>
              ))
            }

          </tr>
        </tbody>
      </table>

      <button onClick={onClick}>Ara</button>

    </div>
  );
}

export default Select;
