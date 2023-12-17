import React, { useState, useEffect } from 'react';

async function fetchTest() {
    const staticData =  [
        {
            "name": "Store1",
            "items": [
                {
                    "name": "Chair",
                    "price": 18.99
                }
            ]
        },
        {
            "name": "Store2",
            "items": [
                {
                    "name": "Leon",
                    "price": 12.99
                }
            ]
        }
    ]

    return staticData.json();
  }
  
  export default async function Page() {
    const stores = await fetchTest();
    return <pre>{JSON.stringify(stores, null, 2)}</pre>
  }