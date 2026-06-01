// Debug utilities for testing the API connection
import { eventsApi } from './api';

export const debugApi = {
  // Test the full flow
  async testConnection() {
    console.log('=== API Connection Test ===');
    
    try {
      // 1. Get initial events
      console.log('1. Getting initial events...');
      const initialEvents = await eventsApi.getEvents();
      console.log('Initial events:', initialEvents.length, 'events');
      
      // 2. Create a test event
      console.log('2. Creating test event...');
      const testEvent = await eventsApi.createEvent({
        title: 'Test Event - ' + Date.now(),
        date: '2025-12-25',
        time: '2:00 PM - 4:00 PM',
        location: 'Test Location',
        description: 'This is a test event for debugging',
        category: 'Test',
        attendees: '10',
        featured: false,
        image: 'https://via.placeholder.com/600x400',
      });
      console.log('Created test event:', testEvent);
      
      // 3. Get events again
      console.log('3. Getting events after creation...');
      const eventsAfterCreation = await eventsApi.getEvents();
      console.log('Events after creation:', eventsAfterCreation.length, 'events');
      
      // 4. Verify our event is there
      const foundEvent = eventsAfterCreation.find(e => e.id === testEvent.id);
      console.log('4. Found our test event:', !!foundEvent);
      
      console.log('=== API Connection Test Complete ===');
      return {
        success: true,
        initialCount: initialEvents.length,
        finalCount: eventsAfterCreation.length,
        testEvent: testEvent,
        foundEvent: !!foundEvent,
      };
    } catch (error) {
      console.error('API Connection Test Failed:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },
  
  // Check window storage and localStorage
  checkWindowStorage() {
    console.log('=== Window Storage Check ===');
    console.log('Window object:', typeof window);
    console.log('Window storage exists:', !!window.__EVENTS_STORAGE__);
    console.log('Window storage length:', window.__EVENTS_STORAGE__?.length || 0);
    console.log('Window storage contents:', window.__EVENTS_STORAGE__);
    
    console.log('--- localStorage Check ---');
    const localStorageEvents = localStorage.getItem('nycn_events');
    console.log('localStorage events exist:', !!localStorageEvents);
    if (localStorageEvents) {
      try {
        const parsed = JSON.parse(localStorageEvents);
        console.log('localStorage events count:', parsed.length);
        console.log('localStorage events:', parsed);
      } catch (error) {
        console.error('localStorage parse error:', error);
      }
    }
    
    console.log('=== Window Storage Check Complete ===');
  },
};

// Make it available globally for testing
if (typeof window !== 'undefined') {
  window.debugApi = debugApi;
  window.testApi = () => debugApi.testConnection();
  window.checkStorage = () => debugApi.checkWindowStorage();
}

declare global {
  interface Window {
    debugApi: typeof debugApi;
    testApi: () => Promise<any>;
    checkStorage: () => void;
    __EVENTS_STORAGE__: any[];
  }
}
