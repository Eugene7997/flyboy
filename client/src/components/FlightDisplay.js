import React, { useState, useEffect } from 'react';
import FlightItem from './FlightItem'; 

export default function FlightDisplay() {
    const [flightLogs, setFlightLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchFlightLogs = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/flightlogs", { method: "GET", credentials: 'include' });
                if (!response.ok) {
                    throw new Error("Failed to fetch flight logs.");
                }
                const data = await response.json();
                setFlightLogs(data);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching flight logs:", error.message);
            }
        };
        fetchFlightLogs();
    }, []);

    const handleSave = async (updatedFlightLog) => {
        try {
            const response = await fetch(`http://localhost:5000/api/flightlogs/${updatedFlightLog._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedFlightLog),
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error("Failed to update flight log.");
            }
            // Update state with the saved flight log
            setFlightLogs(flightLogs.map(log => (log._id === updatedFlightLog._id ? updatedFlightLog : log)));
        } catch (error) {
            console.error("Error saving flight log:", error.message);
        }
    };

    // Handle deletion of flight log
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/flightlogs/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error("Failed to delete flight log.");
            }
            // Update state by removing the deleted flight log
            setFlightLogs(flightLogs.filter(log => log._id !== id));
        } catch (error) {
            console.error("Error deleting flight log:", error.message);
        }
    };

    // Filter flight logs based on search query
    const filteredFlightLogs = flightLogs.filter(log =>
        (log.flightID?.toString() || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h1>Flight Display</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Flight ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full"
                />
            </div>
            { loading ? <p>Loading flight logs...</p> : filteredFlightLogs.length > 0 ? (
                filteredFlightLogs.map(log => (
                    <FlightItem key={log._id} flightLog={log} onSave={handleSave} onDelete={handleDelete} />
                ))
            ) : (
                <p className="text-gray-500">No flight logs found.</p>
            )}
        </div>
    );
}
