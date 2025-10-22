'use client';
import React from 'react';

export default function AboutPage() {
  const studentNumber = '22465403';
  const studentName = 'Trang Tran';

  return (
    <main style={{ 
      padding: '20px',
      maxWidth: '900px',
      margin: '0 auto'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>About This Website</h1>

      <section style={{ 
        marginBottom: '30px', 
        padding: '24px', 
        backgroundColor: 'var(--header-bg)', 
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: 'var(--button-bg)', marginBottom: '20px' }}>👨‍🎓 Student Information</h2>
        <div style={{ fontSize: '16px', lineHeight: '1.8' }}>
          <p style={{ margin: '12px 0' }}><strong>Name:</strong> {studentName}</p>
          <p style={{ margin: '12px 0' }}><strong>Student Number:</strong> {studentNumber}</p>
          <p style={{ margin: '12px 0' }}><strong>Assignment:</strong> Assignment 2 - Next.js Web Application</p>
          <p style={{ margin: '12px 0' }}><strong>Course:</strong> Web Development</p>
          <p style={{ margin: '12px 0' }}><strong>Institution:</strong> University</p>
          <p style={{ margin: '12px 0' }}><strong>Submission Date:</strong> {new Date().toLocaleDateString('en-AU')}</p>
        </div>
      </section>

      <section style={{ 
        padding: '24px', 
        backgroundColor: 'var(--header-bg)', 
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: 'var(--button-bg)', marginBottom: '20px' }}>🎥 How to Use This Website</h2>
        
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <video
            width="100%"
            style={{ 
              maxWidth: '700px',
              border: '2px solid var(--border-color)', 
              borderRadius: '12px',
              display: 'block',
              margin: '0 auto',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
            controls
            poster="/video-thumbnail.jpg"
            aria-describedby="video-description"
          >
            <source src="/demo.mp4" type="video/mp4" />
            <track kind="captions" src="/demo-captions.vtt" srcLang="en" label="English" />
            <p>
              Your browser does not support the video tag. 
              <a href="/demo.mp4" style={{ color: 'var(--button-bg)' }}>Download the video</a> 
              to watch the demonstration.
            </p>
          </video>
          <p id="video-description" style={{ 
            marginTop: '16px', 
            fontStyle: 'italic', 
            color: 'var(--text-color)', 
            opacity: 0.8
          }}>
            📹 Watch this comprehensive tutorial to learn how to use the HTML5 code generator and explore all website features
          </p>
        </div>
        
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ color: 'var(--accent-color)', marginBottom: '16px' }}>📋 Step-by-Step Guide:</h3>
          <ol style={{ paddingLeft: '24px', lineHeight: '1.8', fontSize: '15px' }}>
            <li><strong>Home Page:</strong> Use the HTML5 code generator to create custom web pages</li>
            <li><strong>Configure Settings:</strong> Set title, colors, font size, and content</li>
            <li><strong>Add Features:</strong> Enable navigation, footer, and JavaScript interactivity</li>
            <li><strong>Generate Code:</strong> Click "Generate HTML5" to create complete HTML code</li>
            <li><strong>Copy & Save:</strong> Copy the code and save as "hello.html" or any .html file</li>
            <li><strong>Open in Browser:</strong> Double-click your .html file to view in any web browser</li>
            <li><strong>Explore Pages:</strong> Visit Escape Room, Coding Races, and Court Room sections</li>
          </ol>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ color: 'var(--accent-color)', marginBottom: '16px' }}>✨ Website Features:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '16px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <h4>♿ Accessibility</h4>
              <p style={{ fontSize: '14px', margin: '8px 0' }}>WCAG compliant with proper ARIA labels, semantic HTML, and keyboard navigation</p>
            </div>
            <div style={{ padding: '16px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <h4>🌓 Dark/Light Mode</h4>
              <p style={{ fontSize: '14px', margin: '8px 0' }}>Toggle between themes with system preference detection</p>
            </div>
            <div style={{ padding: '16px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <h4>🍪 Cookie Memory</h4>
              <p style={{ fontSize: '14px', margin: '8px 0' }}>Remembers your last visited menu tab across sessions</p>
            </div>
            <div style={{ padding: '16px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <h4>📱 Responsive</h4>
              <p style={{ fontSize: '14px', margin: '8px 0' }}>Works perfectly on desktop, tablet, and mobile devices</p>
            </div>
            <div style={{ padding: '16px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <h4>⚡ Interactive JS</h4>
              <p style={{ fontSize: '14px', margin: '8px 0' }}>Generated pages include dynamic JavaScript functionality</p>
            </div>
            <div style={{ padding: '16px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <h4>💾 Export Ready</h4>
              <p style={{ fontSize: '14px', margin: '8px 0' }}>Download or copy HTML files ready for immediate use</p>
            </div>
          </div>
        </div>

        <div style={{ 
          padding: '20px',
          backgroundColor: 'var(--button-bg)',
          color: 'white',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h4 style={{ margin: '0 0 12px 0' }}>🎯 Assignment Objectives Met:</h4>
          <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
            ✅ Next.js with App Router | ✅ Multiple Pages | ✅ Responsive Header & Footer | 
            ✅ Hamburger Menu | ✅ Dark/Light Themes | ✅ Accessibility Standards | 
            ✅ Cookie Memory | ✅ HTML5 Code Generator | ✅ Inline CSS & JavaScript Output
          </p>
        </div>
      </section>
    </main>
  );
}