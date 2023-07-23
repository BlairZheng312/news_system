import React, { useEffect, useState } from 'react'
import { convertToRaw, ContentState, EditorState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg"
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

export default function NewsContent(props) {
    // accept saved news content for news update
    const { getNewsContent, news } = props

    // init rich text editor
    const [editorState, setEditorState] = useState('')

    // set rich text editor from saved news content
    useEffect(() => {
        if (news) {
            const contentBlock = htmlToDraft(news.content)
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState)
        }
    }, [news])

    return (
        <div>
            <Editor
                editorState={editorState}
                editorStyle={{ border: '1px solid lightgrey', minHeight: '200px', padding: '0px 10px', borderRadius: '4px' }}
                onEditorStateChange={(editorState) => setEditorState(editorState)}
                onBlur={() => {
                    getNewsContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
                }}
            />
        </div>
    )
}
