#!/usr/bin/env python3
import requests
import json
import sys
import os
from datetime import datetime

# Get the base URL from environment
BASE_URL = "https://sacred-booking-site.preview.emergentagent.com/api"

class PanditBookingAPITest:
    def __init__(self):
        self.base_url = BASE_URL
        self.test_results = []
        
    def log_test(self, test_name, success, message="", response_data=None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "timestamp": datetime.now().isoformat()
        }
        if response_data:
            result["response_data"] = response_data
        
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name}")
        if message:
            print(f"   {message}")
        if response_data and not success:
            print(f"   Response: {response_data}")
        print()

    def test_health_check(self):
        """Test GET /api/ - Health check endpoint"""
        print("=== Testing Health Check Endpoint ===")
        
        try:
            response = requests.get(f"{self.base_url}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check required fields
                required_fields = ['success', 'message', 'timestamp', 'database']
                missing_fields = [field for field in required_fields if field not in data]
                
                if missing_fields:
                    self.log_test(
                        "Health Check - Response Structure", 
                        False, 
                        f"Missing fields: {missing_fields}",
                        data
                    )
                elif data.get('success') and data.get('database') == 'Connected':
                    self.log_test(
                        "Health Check - Success", 
                        True, 
                        f"API is running with database connected. Message: {data.get('message')}"
                    )
                else:
                    self.log_test(
                        "Health Check - Status", 
                        False, 
                        f"Health check returned success={data.get('success')}, database={data.get('database')}",
                        data
                    )
            else:
                self.log_test(
                    "Health Check - HTTP Status", 
                    False, 
                    f"Expected 200, got {response.status_code}",
                    response.text
                )
                
        except requests.exceptions.RequestException as e:
            self.log_test(
                "Health Check - Connection", 
                False, 
                f"Connection error: {str(e)}"
            )

    def test_booking_submission_valid(self):
        """Test POST /api/booking with valid data"""
        print("=== Testing Valid Booking Submission ===")
        
        valid_booking = {
            "name": "Rajesh Kumar",
            "phone": "9876543210",
            "email": "rajesh.kumar@email.com",
            "service": "Wedding Puja",
            "date": "2025-06-15",
            "message": "Need wedding puja for morning muhurat at 6 AM"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/booking",
                json=valid_booking,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 201:
                data = response.json()
                
                required_fields = ['success', 'message', 'bookingId']
                missing_fields = [field for field in required_fields if field not in data]
                
                if missing_fields:
                    self.log_test(
                        "Valid Booking - Response Structure", 
                        False, 
                        f"Missing fields: {missing_fields}",
                        data
                    )
                elif data.get('success') and data.get('bookingId'):
                    self.log_test(
                        "Valid Booking - Success", 
                        True, 
                        f"Booking created successfully with ID: {data.get('bookingId')}"
                    )
                    return data.get('bookingId')  # Return booking ID for later tests
                else:
                    self.log_test(
                        "Valid Booking - Response Content", 
                        False, 
                        "Response missing success=true or bookingId",
                        data
                    )
            else:
                self.log_test(
                    "Valid Booking - HTTP Status", 
                    False, 
                    f"Expected 201, got {response.status_code}",
                    response.text
                )
                
        except requests.exceptions.RequestException as e:
            self.log_test(
                "Valid Booking - Connection", 
                False, 
                f"Connection error: {str(e)}"
            )
        
        return None

    def test_booking_validation_missing_fields(self):
        """Test POST /api/booking with missing required fields"""
        print("=== Testing Booking Validation - Missing Fields ===")
        
        test_cases = [
            {
                "name": "Missing name",
                "data": {"phone": "9876543210", "service": "Wedding Puja"},
                "expected_error": "Name, phone, and service are required"
            },
            {
                "name": "Missing phone", 
                "data": {"name": "Test User", "service": "Wedding Puja"},
                "expected_error": "Name, phone, and service are required"
            },
            {
                "name": "Missing service",
                "data": {"name": "Test User", "phone": "9876543210"},
                "expected_error": "Name, phone, and service are required"
            },
            {
                "name": "All required missing",
                "data": {"email": "test@example.com"},
                "expected_error": "Name, phone, and service are required"
            }
        ]
        
        for test_case in test_cases:
            try:
                response = requests.post(
                    f"{self.base_url}/booking",
                    json=test_case["data"],
                    headers={"Content-Type": "application/json"},
                    timeout=10
                )
                
                if response.status_code == 400:
                    data = response.json()
                    if data.get('error') == test_case["expected_error"]:
                        self.log_test(
                            f"Validation - {test_case['name']}", 
                            True, 
                            f"Correctly rejected with: {data.get('error')}"
                        )
                    else:
                        self.log_test(
                            f"Validation - {test_case['name']}", 
                            False, 
                            f"Wrong error message. Expected: '{test_case['expected_error']}', Got: '{data.get('error')}'",
                            data
                        )
                else:
                    self.log_test(
                        f"Validation - {test_case['name']}", 
                        False, 
                        f"Expected 400 status, got {response.status_code}",
                        response.text
                    )
                    
            except requests.exceptions.RequestException as e:
                self.log_test(
                    f"Validation - {test_case['name']}", 
                    False, 
                    f"Connection error: {str(e)}"
                )

    def test_phone_validation(self):
        """Test phone number validation"""
        print("=== Testing Phone Number Validation ===")
        
        test_cases = [
            {
                "name": "Invalid - Too short",
                "phone": "987654321",  # 9 digits
                "should_pass": False
            },
            {
                "name": "Invalid - Too long",
                "phone": "98765432101",  # 11 digits
                "should_pass": False
            },
            {
                "name": "Invalid - Letters",
                "phone": "987abc4321",
                "should_pass": False
            },
            {
                "name": "Valid - 10 digits",
                "phone": "9876543210",
                "should_pass": True
            },
            {
                "name": "Valid - With formatting",
                "phone": "+91-9876543210",
                "should_pass": True  # Should extract digits
            }
        ]
        
        for test_case in test_cases:
            booking_data = {
                "name": "Test User",
                "phone": test_case["phone"],
                "service": "Wedding Puja"
            }
            
            try:
                response = requests.post(
                    f"{self.base_url}/booking",
                    json=booking_data,
                    headers={"Content-Type": "application/json"},
                    timeout=10
                )
                
                if test_case["should_pass"]:
                    if response.status_code == 201:
                        self.log_test(
                            f"Phone Validation - {test_case['name']}", 
                            True, 
                            f"Valid phone number accepted: {test_case['phone']}"
                        )
                    else:
                        data = response.json() if response.headers.get('content-type', '').startswith('application/json') else response.text
                        self.log_test(
                            f"Phone Validation - {test_case['name']}", 
                            False, 
                            f"Valid phone rejected with status {response.status_code}",
                            data
                        )
                else:
                    if response.status_code == 400:
                        data = response.json()
                        if "valid 10-digit phone number" in data.get('error', ''):
                            self.log_test(
                                f"Phone Validation - {test_case['name']}", 
                                True, 
                                f"Invalid phone correctly rejected: {test_case['phone']}"
                            )
                        else:
                            self.log_test(
                                f"Phone Validation - {test_case['name']}", 
                                False, 
                                f"Wrong error message for invalid phone: {data.get('error')}",
                                data
                            )
                    else:
                        self.log_test(
                            f"Phone Validation - {test_case['name']}", 
                            False, 
                            f"Invalid phone not rejected properly. Status: {response.status_code}",
                            response.text
                        )
                        
            except requests.exceptions.RequestException as e:
                self.log_test(
                    f"Phone Validation - {test_case['name']}", 
                    False, 
                    f"Connection error: {str(e)}"
                )

    def test_email_validation(self):
        """Test email validation"""
        print("=== Testing Email Validation ===")
        
        test_cases = [
            {
                "name": "Valid email",
                "email": "user@example.com",
                "should_pass": True
            },
            {
                "name": "Invalid - No @",
                "email": "userexample.com",
                "should_pass": False
            },
            {
                "name": "Invalid - No domain",
                "email": "user@",
                "should_pass": False
            },
            {
                "name": "Invalid - No TLD",
                "email": "user@example",
                "should_pass": False
            },
            {
                "name": "Empty email (optional field)",
                "email": "",
                "should_pass": True  # Empty should be allowed
            }
        ]
        
        for test_case in test_cases:
            booking_data = {
                "name": "Test User",
                "phone": "9876543210",
                "service": "Wedding Puja"
            }
            
            if test_case["email"]:  # Only add email if not empty
                booking_data["email"] = test_case["email"]
            
            try:
                response = requests.post(
                    f"{self.base_url}/booking",
                    json=booking_data,
                    headers={"Content-Type": "application/json"},
                    timeout=10
                )
                
                if test_case["should_pass"]:
                    if response.status_code == 201:
                        self.log_test(
                            f"Email Validation - {test_case['name']}", 
                            True, 
                            f"Valid email accepted: {test_case['email'] or 'empty'}"
                        )
                    else:
                        data = response.json() if response.headers.get('content-type', '').startswith('application/json') else response.text
                        self.log_test(
                            f"Email Validation - {test_case['name']}", 
                            False, 
                            f"Valid email rejected with status {response.status_code}",
                            data
                        )
                else:
                    if response.status_code == 400:
                        data = response.json()
                        if "valid email address" in data.get('error', ''):
                            self.log_test(
                                f"Email Validation - {test_case['name']}", 
                                True, 
                                f"Invalid email correctly rejected: {test_case['email']}"
                            )
                        else:
                            self.log_test(
                                f"Email Validation - {test_case['name']}", 
                                False, 
                                f"Wrong error message for invalid email: {data.get('error')}",
                                data
                            )
                    else:
                        self.log_test(
                            f"Email Validation - {test_case['name']}", 
                            False, 
                            f"Invalid email not rejected properly. Status: {response.status_code}",
                            response.text
                        )
                        
            except requests.exceptions.RequestException as e:
                self.log_test(
                    f"Email Validation - {test_case['name']}", 
                    False, 
                    f"Connection error: {str(e)}"
                )

    def test_optional_fields(self):
        """Test booking without optional fields"""
        print("=== Testing Optional Fields ===")
        
        # Test with only required fields
        minimal_booking = {
            "name": "Minimal User",
            "phone": "9876543210",
            "service": "Griha Pravesh Puja"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/booking",
                json=minimal_booking,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 201:
                data = response.json()
                if data.get('success') and data.get('bookingId'):
                    self.log_test(
                        "Optional Fields - Minimal Booking", 
                        True, 
                        "Booking successful with only required fields"
                    )
                else:
                    self.log_test(
                        "Optional Fields - Minimal Booking", 
                        False, 
                        "Response missing success or bookingId",
                        data
                    )
            else:
                self.log_test(
                    "Optional Fields - Minimal Booking", 
                    False, 
                    f"Expected 201, got {response.status_code}",
                    response.text
                )
                
        except requests.exceptions.RequestException as e:
            self.log_test(
                "Optional Fields - Minimal Booking", 
                False, 
                f"Connection error: {str(e)}"
            )

    def test_get_bookings(self):
        """Test GET /api/bookings endpoint"""
        print("=== Testing Get Bookings Endpoint ===")
        
        try:
            response = requests.get(f"{self.base_url}/bookings", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                required_fields = ['success', 'count', 'bookings']
                missing_fields = [field for field in required_fields if field not in data]
                
                if missing_fields:
                    self.log_test(
                        "Get Bookings - Response Structure", 
                        False, 
                        f"Missing fields: {missing_fields}",
                        data
                    )
                elif data.get('success') and isinstance(data.get('bookings'), list):
                    bookings = data.get('bookings', [])
                    count = data.get('count', 0)
                    
                    if len(bookings) == count:
                        self.log_test(
                            "Get Bookings - Success", 
                            True, 
                            f"Retrieved {count} bookings successfully"
                        )
                        
                        # Check if bookings are sorted by createdAt (newest first)
                        if len(bookings) > 1:
                            dates = [booking.get('createdAt') for booking in bookings if booking.get('createdAt')]
                            if dates == sorted(dates, reverse=True):
                                self.log_test(
                                    "Get Bookings - Sorting", 
                                    True, 
                                    "Bookings are properly sorted by createdAt (newest first)"
                                )
                            else:
                                self.log_test(
                                    "Get Bookings - Sorting", 
                                    False, 
                                    "Bookings are not sorted by createdAt properly"
                                )
                    else:
                        self.log_test(
                            "Get Bookings - Count Mismatch", 
                            False, 
                            f"Count field ({count}) doesn't match actual bookings length ({len(bookings)})"
                        )
                else:
                    self.log_test(
                        "Get Bookings - Response Content", 
                        False, 
                        "Invalid response structure",
                        data
                    )
            else:
                self.log_test(
                    "Get Bookings - HTTP Status", 
                    False, 
                    f"Expected 200, got {response.status_code}",
                    response.text
                )
                
        except requests.exceptions.RequestException as e:
            self.log_test(
                "Get Bookings - Connection", 
                False, 
                f"Connection error: {str(e)}"
            )

    def test_unknown_endpoints(self):
        """Test unknown endpoints return 404"""
        print("=== Testing Unknown Endpoints ===")
        
        endpoints = [
            ("/unknown", "GET"),
            ("/booking/123", "GET"),
            ("/admin", "POST")
        ]
        
        for endpoint, method in endpoints:
            try:
                if method == "GET":
                    response = requests.get(f"{self.base_url}{endpoint}", timeout=10)
                else:
                    response = requests.post(f"{self.base_url}{endpoint}", json={}, timeout=10)
                
                if response.status_code == 404:
                    self.log_test(
                        f"Unknown Endpoint - {method} {endpoint}", 
                        True, 
                        "Correctly returned 404"
                    )
                else:
                    self.log_test(
                        f"Unknown Endpoint - {method} {endpoint}", 
                        False, 
                        f"Expected 404, got {response.status_code}",
                        response.text
                    )
                    
            except requests.exceptions.RequestException as e:
                self.log_test(
                    f"Unknown Endpoint - {method} {endpoint}", 
                    False, 
                    f"Connection error: {str(e)}"
                )

    def run_all_tests(self):
        """Run all backend API tests"""
        print("🧪 Starting Pandit Booking Backend API Tests")
        print(f"🔗 Base URL: {self.base_url}")
        print("=" * 60)
        
        # Run all tests in logical order
        self.test_health_check()
        self.test_booking_submission_valid()
        self.test_booking_validation_missing_fields()
        self.test_phone_validation()
        self.test_email_validation()
        self.test_optional_fields()
        self.test_get_bookings()
        self.test_unknown_endpoints()
        
        # Summary
        print("=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = len([t for t in self.test_results if t['success']])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests*100):.1f}%")
        
        if failed_tests > 0:
            print("\n🔍 FAILED TESTS:")
            for test in self.test_results:
                if not test['success']:
                    print(f"❌ {test['test']}: {test['message']}")
        
        print("\n" + "=" * 60)
        
        return failed_tests == 0

if __name__ == "__main__":
    tester = PanditBookingAPITest()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)