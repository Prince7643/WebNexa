export const dummyProjects= [
{
id: "proj_001",
name: "AI Code Debugger",
initial_prompt: "Build an AI tool that helps developers debug JavaScript and React errors.",
current_code: `console.log("AI Debugger Running")`,
createdAt: "2026-03-15T09:00:00Z",
updatedAt: "2026-03-16T09:30:00Z",
userId: "user_001",
isPubliced: true,
versionId: "ver_003",
current_version_index: "3",
user: {
id: "user_001",
name: "Rahul",
email: "rahul@example.com",
avatar: "https://i.pravatar.cc/150?img=3"
},
conversation: [
{
id: "msg_001",
role: "user",
content: "Create a React counter component.",
timestamp: "2026-03-16T09:00:00Z"
},
{
id: "msg_002",
role: "assistant",
content: "Here is a simple React counter using useState.",
timestamp: "2026-03-16T09:01:00Z"
}
],
version: [
{
id: "ver_001",
code: `const count = 0`,
timestamp: "2026-03-16T09:01:30Z"
},
{
id: "ver_002",
code: `const [count,setCount] = useState(0)`,
timestamp: "2026-03-16T09:02:30Z"
},
{
id: "ver_003",
code: `setCount(count+1)`,
timestamp: "2026-03-16T09:03:30Z"
}
]
},

{
id: "proj_002",
name: "Real-time Markdown Editor",
initial_prompt: "Create a collaborative markdown editor with live preview.",
current_code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Test Website</title>

<style>
body{
font-family: Arial, sans-serif;
margin:0;
background:#0f172a;
color:white;
}

header{
background:#1e293b;
padding:20px;
text-align:center;
}

main{
padding:40px;
text-align:center;
}

button{
padding:10px 20px;
border:none;
background:#6366f1;
color:white;
border-radius:6px;
cursor:pointer;
font-size:16px;
}

button:hover{
background:#4f46e5;
}

.card{
margin-top:20px;
padding:20px;
background:#1e293b;
border-radius:10px;
display:inline-block;
}
</style>
</head>

<body>

<header>
<h1>My Test Website</h1>
</header>

<main>

<div class="card">
<p id="text">Click the button to change this text.</p>
<button onclick="changeText()">Click Me</button>
</div>

</main>

<script>
function changeText(){
document.getElementById("text").innerText = "The button worked! 🎉";
}
</script>

</body>
</html>`,
createdAt: "2026-03-10T10:00:00Z",
updatedAt: "2026-03-15T14:20:00Z",
userId: "user_002",
isPubliced: false,
versionId: "ver_002",
current_version_index: "2",
user: {
id: "user_002",
name: "Aman",
email: "aman@example.com",
avatar: "https://i.pravatar.cc/150?img=5"
},
conversation: [
{
id: "msg_003",
role: "user",
content: "Create a markdown preview feature.",
timestamp: "2026-03-15T14:00:00Z"
}
],
version: [
{
id: "ver_001",
code: `<textarea />`,
timestamp: "2026-03-15T14:05:00Z"
},
{
id: "ver_002",
code: `<ReactMarkdown>{text}</ReactMarkdown>`,
timestamp: "2026-03-15T14:10:00Z"
}
]
},

{
id: "proj_003",
name: "AI Resume Analyzer",
initial_prompt: "Build a web app that analyzes resumes and gives improvement suggestions.",
current_code: `function analyzeResume(){}`,
createdAt: "2026-03-01T12:30:00Z",
updatedAt: "2026-03-05T16:45:00Z",
userId: "user_003",
isPubliced: true,
versionId: "ver_001",
current_version_index: "1",
user: {
id: "user_003",
name: "Neha",
email: "neha@example.com",
avatar: "https://i.pravatar.cc/150?img=8"
},
conversation: [
{
id: "msg_004",
role: "user",
content: "Analyze this resume and give suggestions.",
timestamp: "2026-03-05T16:30:00Z"
}
],
version: [
{
id: "ver_001",
code: `function analyzeResume(resume){ return "Suggestions"; }`,
timestamp: "2026-03-05T16:40:00Z"
}
]
},

{
id: "proj_004",
name: "Collaborative Whiteboard",
initial_prompt: "Create a realtime whiteboard for teams using WebSockets.",
current_code: `const socket = new WebSocket("ws://localhost")`,
createdAt: "2026-02-20T08:00:00Z",
updatedAt: "2026-02-22T11:00:00Z",
userId: "user_004",
isPubliced: false,
versionId: "ver_002",
current_version_index: "2",
user: {
id: "user_004",
name: "Rohit",
email: "rohit@example.com",
avatar: "https://i.pravatar.cc/150?img=11"
},
conversation: [
{
id: "msg_005",
role: "user",
content: "Implement drawing feature.",
timestamp: "2026-02-22T10:00:00Z"
}
],
version: [
{
id: "ver_001",
code: `canvas.addEventListener("mousemove")`,
timestamp: "2026-02-22T10:10:00Z"
},
{
id: "ver_002",
code: `socket.send(drawData)`,
timestamp: "2026-02-22T10:20:00Z"
}
]
},

{
id: "proj_005",
name: "Code Snippet Manager",
initial_prompt: "Build a platform to save and organize reusable code snippets.",
current_code: `const snippets = []`,
createdAt: "2026-01-15T07:20:00Z",
updatedAt: "2026-01-18T09:15:00Z",
userId: "user_005",
isPubliced: true,
versionId: "ver_002",
current_version_index: "2",
user: {
id: "user_005",
name: "Priya",
email: "priya@example.com",
avatar: "https://i.pravatar.cc/150?img=12"
},
conversation: [
{
id: "msg_006",
role: "user",
content: "Create a snippet saving feature.",
timestamp: "2026-01-18T09:00:00Z"
}
],
version: [
{
id: "ver_001",
code: `const snippets = []`,
timestamp: "2026-01-18T09:05:00Z"
},
{
id: "ver_002",
code: `snippets.push(newSnippet)`,
timestamp: "2026-01-18T09:10:00Z"
}
]
}
];

export const dummyMessages = [
{
id: "msg_001",
role: "user",
content: "Create a simple React counter component.",
timestamp: "2026-03-16T18:00:00Z"
},
{
id: "msg_002",
role: "assistant",
content: "Here is a React counter using useState.",
timestamp: "2026-03-16T18:01:00Z"
},
{
id: "msg_003",
role: "user",
content: "Add increment and decrement buttons.",
timestamp: "2026-03-16T18:02:00Z"
},
{
id: "msg_004",
role: "assistant",
content: "Updated the counter with both increment and decrement functionality.",
timestamp: "2026-03-16T18:03:00Z"
},
{
id: "msg_005",
role: "assistant",
content: "You can also add styling using Tailwind CSS.",
timestamp: "2026-03-16T18:04:00Z"
}
];

export const dummyVersions = [
{
id: "ver_001",
timestamp: "2026-03-16T18:01:30Z",
code: `
import { useState } from "react";

export default function Counter(){
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={()=>setCount(count + 1)}>Increment</button>
    </div>
  )
}
`
},

{
id: "ver_002",
timestamp: "2026-03-16T18:02:30Z",
code: `
import { useState } from "react";

export default function Counter(){
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={()=>setCount(count + 1)}>Increment</button>
      <button onClick={()=>setCount(count - 1)}>Decrement</button>
    </div>
  )
}
`
},

{
id: "ver_003",
timestamp: "2026-03-16T18:03:30Z",
code: `
import { useState } from "react";

export default function Counter(){
  const [count, setCount] = useState(0);

  return (
    <div className="flex gap-3 items-center">
      <button onClick={()=>setCount(count - 1)}>-</button>
      <h1>{count}</h1>
      <button onClick={()=>setCount(count + 1)}>+</button>
    </div>
  )
}
`
},

{
id: "ver_004",
timestamp: "2026-03-16T18:04:30Z",
code: `
import { useState } from "react";

export default function Counter(){
  const [count, setCount] = useState(0);

  return (
    <div className="flex gap-3 items-center p-4 bg-gray-900 text-white rounded">
      <button onClick={()=>setCount(count - 1)}>-</button>
      <h1 className="text-xl">{count}</h1>
      <button onClick={()=>setCount(count + 1)}>+</button>
    </div>
  )
}
`
},

{
id: "ver_005",
timestamp: "2026-03-16T18:05:30Z",
code: `
import { useState } from "react";

export default function Counter(){
  const [count, setCount] = useState(0);

  const reset = () => setCount(0);

  return (
    <div className="flex gap-3 items-center p-4 bg-gray-900 text-white rounded">
      <button onClick={()=>setCount(count - 1)}>-</button>
      <h1 className="text-xl">{count}</h1>
      <button onClick={()=>setCount(count + 1)}>+</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
`
}
];


export const dummyPlans = [
{
id: "plan_free",
name: "Free",
price: "$0",
credits: 50,
description: "Basic access for individuals exploring the platform.",
features: [
"50 AI credits per month",
"Basic code generation",
"Community support",
"Limited project storage"
]
},

{
id: "plan_starter",
name: "Starter",
price: "$9",
credits: 500,
description: "Great for developers building small projects with AI assistance.",
features: [
"500 AI credits per month",
"Faster AI responses",
"Unlimited projects",
"Code version history",
"Email support"
]
},

{
id: "plan_pro",
name: "Pro",
price: "$29",
credits: 2000,
description: "Perfect for professional developers who rely on AI daily.",
features: [
"2000 AI credits per month",
"Priority AI processing",
"Full code generation",
"Advanced debugging tools",
"Project collaboration",
"Priority support"
]
},

{
id: "plan_team",
name: "Team",
price: "$79",
credits: 8000,
description: "Designed for teams collaborating on AI-powered development.",
features: [
"8000 AI credits per month",
"Team collaboration tools",
"Shared project workspace",
"Version control integration",
"Advanced analytics",
"Priority team support"
]
},

{
id: "plan_enterprise",
name: "Enterprise",
price: "Custom",
credits: 50000,
description: "Enterprise-grade AI development platform with full customization.",
features: [
"Custom AI credits",
"Dedicated infrastructure",
"Advanced security",
"Custom integrations",
"Account manager",
"24/7 enterprise support"
]
}
];

export const iframeScripts = `
<script id="ai-preview-script">
(function () {

let selectedEl = null;
let isEditMode = false; // ✅ GLOBAL inside iframe

// ✅ LISTEN FOR MESSAGES
window.addEventListener('message', (event) => {
    const type = event.data.type;

    if (type === 'SET_EDIT_MODE') {
        isEditMode = event.data.payload.enabled;
        console.log("Edit mode:", isEditMode); // ✅ now will work
    }

    if (type === 'UPDATE_ELEMENT') {
        const updates = event.data.payload?.updatedFields;
        if (!selectedEl) return;

        if (updates.text !== undefined) {
            selectedEl.innerText = updates.text;
        }

        if (updates.className !== undefined) {
            selectedEl.className = updates.className;
        }

        if (updates.style) {
            Object.keys(updates.style).forEach(key => {
                selectedEl.style[key] = updates.style[key];
            });
        }
    }

    if (type === 'CLEAR_SELECTION_REQUEST') {
        if (selectedEl) {
            selectedEl.classList.remove('ai-selected-element');
            selectedEl.style.outline = '';
            selectedEl = null;
        }
    }
});

// ✅ CLICK HANDLER
document.addEventListener('click', function(e) {
    const el = e.target;
    const anchor = el.closest('a');

    if (anchor && anchor.getAttribute('href')) {
        const href = anchor.getAttribute('href');

        // 🚨 Stop default iframe navigation
        e.preventDefault();

        // 📤 Send navigation to parent
        window.parent.postMessage({
            type: 'NAVIGATE',
            payload: { href }
        }, '*');

        return;
    }

    // 👇 Edit mode logic (same as before)
    if (!isEditMode) return;

    selectedEl = el;
    document.querySelectorAll('.ai-selected-element').forEach(node => {
        node.classList.remove('ai-selected-element');
        node.style.outline = '';
    });

    el.classList.add('ai-selected-element');
    el.style.outline = '2px solid #6366f1';

    const computed = window.getComputedStyle(el);

    window.parent.postMessage({
        type: 'ELEMENT_SELECTED',
        payload: {
            text: el.innerText,
            className: el.className,
            style: {
                padding: computed.padding,
                margin: computed.margin,
                fontSize: computed.fontSize,
                backgroundColor: computed.backgroundColor,
                color: computed.color
            }
        }
    }, '*');
});

})();
</script>
`;