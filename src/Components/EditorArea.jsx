import React, { useEffect, useRef, useState } from 'react'
import Editor from '@monaco-editor/react';
import { Snippet } from '../constant';



const EditorArea = ({ lang, socketRef, roomId }) => {

    const [value, setValue] = useState(Snippet[lang] || "// some comment");
    const [fontSize, setFontSize] = useState(14);
    const editRef = useRef(null);

    const handleResize = () => {
        const isMd = window.matchMedia('(min-width: 768px)').matches;
        setFontSize(isMd ? 24 : 14);
    };

    useEffect(() => {
        handleResize(); // Set initial font size
        window.addEventListener('resize', handleResize); // Add resize listener
        return () => window.removeEventListener('resize', handleResize); // Clean up listener on unmount
    }, []);

    useEffect(() => {
        if (editRef.current) {
            const newValue = Snippet[lang] || "// some comment";
            editRef.current.setValue(newValue); // Update editor content
            setValue(newValue); // Update state
        }
    }, [lang]);
    const onMount = ((editor) => {
        editRef.current = editor;
        editor.focus();
    });

    const handleChange = (newValue) => {
        setValue(newValue);
        if (socketRef.current) {
            socketRef.current.emit('codeChange', {
                roomId,
                value: newValue
            });
        }
    };

    useEffect(() => {
        if (socketRef.current) {
            const handleCodeChange = ({ value: newValue }) => {
                // console.log(newValue)
                setValue(newValue);
            };

            socketRef.current.on('codeChange', handleCodeChange);

            // Clean up the event listener when the component unmounts or socketRef changes
            return () => {
                socketRef.current.off('codeChange', handleCodeChange);
            };
        }
    }, [socketRef.current]);

    return (
        <Editor
            height="85vh"
            language={lang}
            theme='vs-dark'
            value={value}
            onChange={handleChange}
            onMount={onMount}
            options={{
                fontSize: fontSize,
                wordWrap: 'on',
                minimap: {
                    enabled: false
                }
            }}
        />
    )
}

export default EditorArea