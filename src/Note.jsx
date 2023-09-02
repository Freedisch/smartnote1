import { useState } from 'react'
import './App.css'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import NoteIcon from '@mui/icons-material/Note';
import SummarizeIcon from '@mui/icons-material/Summarize';
import MicIcon from '@mui/icons-material/Mic';

export default function Note() {
  const [value, setValue] = useState(1)
  return (
    <div className='bg-slate-700'>
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
  </div>
  )
}
