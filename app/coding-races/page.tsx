'use client';
import React from 'react';

export default function CodingRacesPage() {
  return (
    <main style={{ 
      padding: '20px',
      maxWidth: '900px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <div style={{
        padding: '60px 40px',
        backgroundColor: 'var(--header-bg)',
        borderRadius: '12px',
        border: '2px dashed var(--border-color)',
        marginBottom: '30px'
      }}>
        <div style={{ fontSize: '72px', marginBottom: '20px' }}>🏁</div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: 'var(--button-bg)' }}>
          Coding Races
        </h1>
        <p style={{ fontSize: '18px', color: 'var(--text-color)', opacity: 0.8, marginBottom: '30px' }}>
          This page will feature competitive programming challenges and coding competitions.
        </p>
        <div style={{
          padding: '20px',
          backgroundColor: 'var(--accent-color)',
          color: 'white',
          borderRadius: '8px',
          fontWeight: 'bold'
        }}>
          ⚡ Coming Soon: Fast-paced coding challenges and tournaments!
        </div>
      </div>

      <div style={{
        padding: '24px',
        backgroundColor: 'var(--bg-color)',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        textAlign: 'left'
      }}>
        <h2>🚀 Planned Features:</h2>
        <ul style={{ paddingLeft: '24px', lineHeight: '1.8' }}>
          <li>Real-time coding competitions</li>
          <li>Algorithm challenges</li>
          <li>Speed coding tests</li>
          <li>Multiple programming languages</li>
          <li>Live leaderboards</li>
          <li>Achievement system</li>
        </ul>
      </div>
    </main>
  );
}