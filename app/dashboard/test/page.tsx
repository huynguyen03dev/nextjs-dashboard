"use client";

import { useEffect, useState, FormEvent, useRef, useCallback } from "react";
import Script from "next/script";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";

// Add TypeScript declarations for Puter
declare global {
	interface Window {
		puter: {
			ai: {
				chat: (prompt: string, options: { 
					model: string,
					stream?: boolean 
				}) => Promise<{
					message: { content: string }
				} | AsyncIterable<{ text?: string }>>
			}
		} | undefined;
	}
}

const Page = () => {
	const router = useRouter();
	const [explanation, setExplanation] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isStreaming, setIsStreaming] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);
	const [prompt, setPrompt] = useState<string>("Hello nigga?");
	const responseRef = useRef<HTMLDivElement>(null);
	const abortControllerRef = useRef<AbortController | null>(null);
	const isMountedRef = useRef<boolean>(true);

	// Reset function to clear all states
	const resetStates = useCallback(() => {
		if (isMountedRef.current) {
			setIsLoading(false);
			setIsStreaming(false);
			setError(null);
		}
	}, []);

	// Setup component mount/unmount handling
	useEffect(() => {
		isMountedRef.current = true;
		
		// Check if Puter is already available in window
		if (typeof window !== "undefined" && window.puter) {
			setIsScriptLoaded(true);
		}
		
		return () => {
			isMountedRef.current = false;
			
			// Cancel any ongoing requests when component unmounts
			if (abortControllerRef.current) {
				try {
					abortControllerRef.current.abort();
				} catch (e) {
					console.error("Error aborting request:", e);
				}
			}
			
			// Reset all states on unmount
			resetStates();
		};
	}, [resetStates]);

	// Script load handler that's safe for navigation
	const handleScriptLoad = useCallback(() => {
		console.log("Puter script loaded");
		if (isMountedRef.current) {
			setIsScriptLoaded(true);
		}
	}, []);

	// Script error handler that's safe for navigation
	const handleScriptError = useCallback(() => {
		if (isMountedRef.current) {
			setError("Failed to load Puter script");
			setIsLoading(false);
		}
	}, []);

	const handlePuterQuery = async (e?: FormEvent) => {
		if (e) e.preventDefault();
		
		if (!isScriptLoaded) {
			setError("Puter script is not loaded yet. Please wait.");
			return;
		}

		// Cancel any previous ongoing requests
		if (abortControllerRef.current) {
			try {
				abortControllerRef.current.abort();
			} catch (e) {
				console.error("Error aborting previous request:", e);
			}
		}
		
		// Create a new abort controller for this request
		abortControllerRef.current = new AbortController();
		const signal = abortControllerRef.current.signal;
		
		if (isMountedRef.current) {
			setIsLoading(true);
			setError(null);
			setExplanation("");
		}
		
		try {
			if (typeof window !== "undefined" && window.puter) {
				if (isMountedRef.current) {
					setIsStreaming(true);
				}
				
				const response = await window.puter.ai.chat(
					prompt, 
					{ model: "deepseek-chat", stream: true }
				);
				
				// Handle streaming response
				if (Symbol.asyncIterator in Object(response)) {
					for await (const part of response as AsyncIterable<{ text?: string }>) {
						// Check if component is still mounted before updating state
						if (!isMountedRef.current || signal.aborted) break;
						
						if (part?.text) {
							setExplanation(prev => prev + part.text);
							
							// Auto-scroll to bottom of response
							if (responseRef.current) {
								responseRef.current.scrollTop = responseRef.current.scrollHeight;
							}
						}
					}
				}
				
				// Only update state if component is still mounted
				if (isMountedRef.current && !signal.aborted) {
					setIsStreaming(false);
				}
			}
		} catch (err) {
			// Only handle errors if they're not from aborting and component is still mounted
			if ((err as Error).name !== 'AbortError' && isMountedRef.current) {
				console.error("Error using Puter AI:", err);
				setError("Failed to load Puter AI response. See console for details.");
			}
		} finally {
			// Only update state if component is still mounted
			if (isMountedRef.current) {
				setIsLoading(false);
				setIsStreaming(false);
			}
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-4xl mx-auto px-4">
				<div className="bg-white rounded-xl shadow-lg overflow-hidden">
					<div className="p-6 md:p-8">
						<h1 className="text-3xl font-bold mb-2 text-gray-800">Puter AI Assistant</h1>
						<p className="text-gray-600 mb-6">Ask anything and get intelligent responses</p>
						
						{/* Load the Puter script */}
						<Script 
							src="https://js.puter.com/v2/" 
							strategy="lazyOnload"
							onLoad={handleScriptLoad}
							onError={handleScriptError}
						/>
						
						<form onSubmit={handlePuterQuery} className="mb-8">
							<div className="flex flex-col space-y-3">
								<label htmlFor="prompt" className="font-medium text-gray-700">
									Your question:
								</label>
								<textarea
									id="prompt"
									value={prompt}
									onChange={(e) => setPrompt(e.target.value)}
									className="border border-gray-300 rounded-lg p-3 min-h-[120px] bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
									placeholder="Enter your question here..."
								/>
								<button
									type="submit"
									disabled={isLoading || isStreaming || !isScriptLoaded}
									className={`px-5 py-3 rounded-lg font-medium transition-all ${
										isLoading || isStreaming || !isScriptLoaded
											? "bg-gray-300 text-gray-500 cursor-not-allowed"
											: "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
									}`}
								>
									{isLoading || isStreaming ? (
										<span className="flex items-center justify-center">
											<svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
												<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
												<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
											</svg>
											{isStreaming ? "Receiving..." : "Processing..."}
										</span>
									) : "Get Answer"}
								</button>
							</div>
						</form>
						
						{!isScriptLoaded && !error && (
							<div className="flex items-center justify-center p-6 bg-yellow-50 rounded-lg mb-6">
								<svg className="animate-spin h-5 w-5 mr-3 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								<p className="text-yellow-700">Loading Puter AI script...</p>
							</div>
						)}
						
						{error && (
							<div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
								<p className="text-red-600">{error}</p>
							</div>
						)}
						
						{(explanation || isStreaming) && (
							<div className="mt-8 border border-gray-200 rounded-xl overflow-hidden">
								<div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
									<h2 className="text-lg font-semibold text-gray-800">Response</h2>
									{isStreaming && (
										<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
											<span className="relative flex h-2 w-2 mr-1">
												<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
												<span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
											</span>
											Streaming
										</span>
									)}
								</div>
								<div 
									className="p-6 bg-white overflow-y-auto max-h-[500px] transition-all duration-200" 
									ref={responseRef}
								>
									<div className="prose max-w-none">
										<ReactMarkdown>
											{explanation || "Waiting for response..."}
										</ReactMarkdown>
									</div>
									{isStreaming && (
										<span className="inline-block w-1 h-5 ml-1 bg-black animate-pulse" />
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;