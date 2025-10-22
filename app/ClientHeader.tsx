'use client';
import React from 'react';
import Link from 'next/link';

export default function ClientHeader() {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      borderBottom: '1px solid #ccc',
      padding: '12px 24px',
      zIndex: 1000
    }}>
      <nav>
        <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', margin: 0, padding: 0 }}>
          <li>
            <Link href="/" style={{ textDecoration: 'none', color: '#0070f3', fontWeight: '500' }}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" style={{ textDecoration: 'none', color: '#0070f3', fontWeight: '500' }}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}