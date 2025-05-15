import { useState, useCallback } from 'react';
import { 
  Page, 
  Card, 
  FormLayout, 
  Select, 
  TextField, 
  Button, 
  Text, 
  BlockStack,
  Box
} from '@shopify/polaris';

function HomePage() {
  const [sourceTime, setSourceTime] = useState('');
  const [sourceTimezone, setSourceTimezone] = useState('UTC');
  const [targetTimezone, setTargetTimezone] = useState('America/New_York');
  const [convertedTime, setConvertedTime] = useState('');
  
  const timezoneOptions = [
    {label: 'UTC', value: 'UTC'},
    {label: 'New York (EST/EDT)', value: 'America/New_York'},
    {label: 'Los Angeles (PST/PDT)', value: 'America/Los_Angeles'},
    {label: 'London (GMT/BST)', value: 'Europe/London'},
    {label: 'Paris (CET/CEST)', value: 'Europe/Paris'},
    {label: 'Tokyo (JST)', value: 'Asia/Tokyo'},
    {label: 'Sydney (AEST/AEDT)', value: 'Australia/Sydney'},
    {label: 'Shanghai (CST)', value: 'Asia/Shanghai'},
    {label: 'Mumbai (IST)', value: 'Asia/Kolkata'},
    {label: 'Dubai (GST)', value: 'Asia/Dubai'},
  ];

  const handleSourceTimeChange = useCallback(
    (value: string) => setSourceTime(value),
    [],
  );

  const handleSourceTimezoneChange = useCallback(
    (value: string) => setSourceTimezone(value),
    [],
  );

  const handleTargetTimezoneChange = useCallback(
    (value: string) => setTargetTimezone(value),
    [],
  );

  const convertTime = useCallback(() => {
    try {
      // Check if the input is a valid time format (HH:MM or HH:MM:SS)
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(?::([0-5][0-9]))?$/;
      if (!timeRegex.test(sourceTime)) {
        setConvertedTime('Invalid time format. Please use HH:MM or HH:MM:SS');
        return;
      }

      // Get current date in ISO format and replace the time part with the input time
      const now = new Date();
      const [hours, minutes, seconds = '00'] = sourceTime.split(':');
      
      // Create a date object with the current date and the specified time
      const year = now.getFullYear();
      const month = now.getMonth();
      const day = now.getDate();
      
      // Create a date object in the local timezone
      const sourceDate = new Date(year, month, day, parseInt(hours), parseInt(minutes), parseInt(seconds));
      
      // Format the time for display in both timezones
      const targetTimeFormatted = sourceDate.toLocaleTimeString('en-US', {
        timeZone: targetTimezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZoneName: 'short'
      });
      
      setConvertedTime(targetTimeFormatted);
    } catch (error) {
      console.error('Conversion error:', error);
      setConvertedTime('Error converting time. Please check your input.');
    }
  }, [sourceTime, sourceTimezone, targetTimezone]);

  return (
    <Page title="Time Zone Converter" subtitle="Convert times between different time zones">
      <Card>
        <BlockStack gap="400">
          <FormLayout>
            <TextField
              label="Enter time (24-hour format)"
              value={sourceTime}
              onChange={handleSourceTimeChange}
              placeholder="HH:MM or HH:MM:SS"
              autoComplete="off"
              helpText="Example: 14:30 or 14:30:00"
            />
            
            <Select
              label="Source time zone"
              options={timezoneOptions}
              onChange={handleSourceTimezoneChange}
              value={sourceTimezone}
            />
            
            <Select
              label="Target time zone"
              options={timezoneOptions}
              onChange={handleTargetTimezoneChange}
              value={targetTimezone}
            />
            
            <Button onClick={convertTime} variant="primary">Convert Time</Button>
          </FormLayout>
          
          {convertedTime && (
            <Box paddingBlockStart="400">
              <BlockStack gap="200">
                <Text as="h3" variant="headingMd">Converted Time:</Text>
                <Text as="p" variant="bodyLg" fontWeight="semibold">{convertedTime}</Text>
              </BlockStack>
            </Box>
          )}
        </BlockStack>
      </Card>
    </Page>
  );
}

export default HomePage;
