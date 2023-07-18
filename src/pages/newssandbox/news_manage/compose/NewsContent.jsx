import React, { useState } from 'react'
import { convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import draftToHtml from 'draftjs-to-html';

export default function NewsContent(props) {
    const [editorState, setEditorState] = useState('')
    const { getNewsContent } = props
    return (
        <div>
            <Editor
                editorState={editorState}
                editorStyle={{border:'1px solid lightgrey', minHeight:'200px', padding: '0px 10px'}}
                onEditorStateChange={(editorState) => setEditorState(editorState)}
                onBlur={() => {
                    getNewsContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
                }}
            />
        </div>
    )
}
