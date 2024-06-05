import React, { useEffect, useRef, useState } from 'react';
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
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (editRef.current) {
            const newValue = Snippet[lang] || "// some comment";
            editRef.current.setValue(newValue);
            setValue(newValue);
        }
    }, [lang]);

    const onMount = editor => {
        editRef.current = editor;
        editor.focus();
    };

    const handleChange = newValue => {
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
                setValue(newValue);
            };

            socketRef.current.on('codeChange', handleCodeChange);

            socketRef.current.emit('requestInitialCode', roomId); // Request initial code from server

            return () => {
                socketRef.current.off('codeChange', handleCodeChange);
            };
        }
    }, [socketRef.current, roomId]);

    useEffect(() => {
        if (socketRef.current) {
            const handleInitialCode = ({ value: initialValue }) => {
                setValue(initialValue);
                if (editRef.current) {
                    editRef.current.setValue(initialValue);
                }
            };

            socketRef.current.on('initialCode', handleInitialCode);

            return () => {
                socketRef.current.off('initialCode', handleInitialCode);
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
                minimap: { enabled: false }
            }}
        />
    );
};

export default EditorArea;
