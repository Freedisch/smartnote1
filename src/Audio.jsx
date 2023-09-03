import { useState, useEffect } from 'react'
import './App.css'
import { BottomNavigation, BottomNavigationAction, LinearProgress } from '@mui/material'
import NoteIcon from '@mui/icons-material/Note';
import SummarizeIcon from '@mui/icons-material/Summarize';
import MicIcon from '@mui/icons-material/Mic';
import OpenAI from 'openai';

const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'
function Audio() {
  const [value, setValue] = useState(0)
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])

  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      console.log('test')
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }
  // const handleSaveNote = () => {
  //   setSavedNotes([...savedNotes, note])
  //   setNote('')
  // }

  const generateSummary = async (note) => {
    // const configuration = new Configuration({
    //   // eslint-disable-next-line no-undef
      
    // });
    const OPENAI_API_KEY = ""
    const openai = new OpenAI({
      // eslint-disable-next-line no-undef
      apiKey: OPENAI_API_KEY,
    });
    // eslint-disable-next-line no-undef
    console.log(OPENAI_API_KEY);
  
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `A very detail summary of this text ${note}`,
        },
      ],
    });
    console.log(completion.data.choices[0].message.content);
    setSavedNotes([...savedNotes, completion.data.choices[0].message.content])
    setNote('')
  }
  return (
    <div className=''>
      <div>
      <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Mic" icon={<MicIcon />} href='/'/>
          <BottomNavigationAction label="Notes" icon={<NoteIcon />} href='/notes'/>
          <BottomNavigationAction label="Questions" icon={<SummarizeIcon />} href='/questions'/>
      </BottomNavigation>
      </div>
      
      <LinearProgress />
      <div className="box">
          {/* <h2>Current Note</h2> */}
          <button onClick={() => setIsListening(prevState => !prevState)}>
          {isListening ? <span>🛑</span> : <span>🎙️</span>} Start/Stop
          </button>
          <br></br>
          <button onClick={generateSummary} disabled={!note} className=" mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
  Generate Summary
</button>
          
          
          <p className='mt-5'>{note}</p>
        </div>
      {/* <p>{note}</p> */}

      <div className="box">
          <h2>Notes</h2>
          {savedNotes.map(n => (
            <p key={n}>{n}</p>
          ))}
        </div>
    </div>
  )
}

export default Audio
