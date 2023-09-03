import { useState, useEffect } from "react";
import "./App.css";
import {
  BottomNavigation,
  BottomNavigationAction,
  LinearProgress,
  Paper,
} from "@mui/material";
import NoteIcon from "@mui/icons-material/Note";
import SummarizeIcon from "@mui/icons-material/Summarize";
import MicIcon from "@mui/icons-material/Mic";
import OpenAI from "openai";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";
function Audio() {
  const [value, setValue] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState("");

  function splitSentences(text) {
    // if (typeof text !== 'string') {
    //   return [];
    // }
    console.log("=============text i got===========");
    console.log(text);
    const sentences = text.split("-").map((sentence) => sentence.trim());
    return sentences;
  }

  // const text = "- Important human diseases caused by viruses: measles, HIV, polio, influenza, and hepatitis. The debate on whether viruses are living or non-living entities. Introduction to the study of viruses in biology. Exploring the structure and characteristics of viruses."
  // console.log("=============arrray===========")
  // console.log(splitSentences(text));
  // console.log("=============arrray===========")

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      // console.log(transcript)
      console.log("test");
      setNote(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };
  // const handleSaveNote = () => {
  //   setSavedNotes([...savedNotes, note])
  //   setNote('')
  // }

  const generateSummary = async (note) => {
    // const configuration = new Configuration({
    //   // eslint-disable-next-line no-undef

    // });
    const OPENAI_API_KEY =
      "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";
    const openai = new OpenAI({
      // eslint-disable-next-line no-undef
      apiKey: OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });
    // eslint-disable-next-line no-undef
    console.log(OPENAI_API_KEY);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `generate a short note of the important points with bullet points that might help a student for exam preparation. `,
        },
        {
          role: "user",
          content: note,
        },
      ],
      // temperature: 0,
      // max_tokens: 1024,
    });
    const sentence = splitSentences(note);
    console.log("=============================================");
    console.log(response.choices[0].message.content);

    console.log(response.data);

    console.log("=============================================");
    setSavedNotes(response.choices[0].message.content);
    setNote("");
  };

  /*

ontent
: 
"- Viruses cause a number of important human diseases such as measles, HIV, polio, influenza, and hepatitis.\n- Understanding viruses is crucial in studying and preventing these diseases.\n- Before discussing virus structures, it's important to determine whether viruses are living or non-living.\n- This is a question for discussion and contemplation: Is a virus considered a living or non-living thing?"
role
: 
"assistant"
*/

  return (
    <div className="">
      <div>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <button onClick={() => setIsListening((prevState) => !prevState)}>
            {isListening ? (
              <>
                <span>🛑Stop</span>
                <LinearProgress />
              </>
            ) : (
              <span>🎙️ Start</span>
            )}
          </button>
          <br></br>
          <button
            onClick={() => generateSummary(note)}
            disabled={!note}
            className=" mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          >
            Generate Note
          </button>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Mic" icon={<MicIcon />} href="/" />
            <BottomNavigationAction
              label="Notes"
              icon={<NoteIcon />}
              href="/notes"
            />
            <BottomNavigationAction
              label="Questions"
              icon={<SummarizeIcon />}
              href="/questions"
            />
          </BottomNavigation>
        </Paper>
      </div>

      <div className="box">
        {/* <h2>Current Note</h2> */}

        <p className="mt-5">{note}</p>
      </div>
      {/* <p>{note}</p> */}

      <div className="box">
        {/* <h2>Notes</h2> */}

        <ul className="list-decimal list-inside">
          {splitSentences(savedNotes).map((n) => (
            <li className="text-left" key={n}>
              {n}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Audio;
