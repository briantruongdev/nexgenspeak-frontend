#!/bin/bash

# Frontend Deploy Script for NexGen Speak
# This script builds the frontend and deploys to S3 with CloudFront invalidation

set -e  # Exit on any error

# Configuration
S3_BUCKET="nexgenspeak.com"
CLOUDFRONT_DISTRIBUTION_ID="E1MXX4MJGVTO48"
AWS_PROFILE="canh"
BUILD_DIR="dist"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."

    if ! command_exists npm; then
        print_error "npm is not installed. Please install Node.js and npm."
        exit 1
    fi

    if ! command_exists aws; then
        print_error "AWS CLI is not installed. Please install AWS CLI."
        exit 1
    fi

    # Check if AWS profile exists
    if ! aws configure list-profiles | grep -q "^${AWS_PROFILE}$"; then
        print_error "AWS profile '${AWS_PROFILE}' not found. Please configure it first."
        exit 1
    fi

    print_success "All prerequisites met!"
}

# Build the frontend
build_frontend() {
    print_status "Building frontend..."

    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        print_status "Installing dependencies..."
        npm install
    fi

    print_status "Running build command..."
    export NUXT_PUBLIC_DEFAULT_LOCALE=vi
    npm run build

    # Check if build was successful
    if [ ! -d "$BUILD_DIR" ]; then
        print_error "Build failed! $BUILD_DIR directory not found."
        exit 1
    fi

    print_success "Frontend built successfully!"
}

# Deploy to S3
deploy_to_s3() {
    print_status "Deploying to S3 bucket: $S3_BUCKET"

    # Sync files to S3
    aws s3 sync $BUILD_DIR/ s3://$S3_BUCKET --delete --profile $AWS_PROFILE

    if [ $? -eq 0 ]; then
        print_success "Successfully deployed to S3!"
    else
        print_error "Failed to deploy to S3!"
        exit 1
    fi
}

# Invalidate CloudFront cache
invalidate_cloudfront() {
    print_status "Invalidating CloudFront cache..."

    aws cloudfront create-invalidation \
        --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
        --paths "/*" \
        --profile $AWS_PROFILE

    if [ $? -eq 0 ]; then
        print_success "CloudFront cache invalidated successfully!"
    else
        print_error "Failed to invalidate CloudFront cache!"
        exit 1
    fi
}

# Clean up
cleanup() {
    print_status "Cleaning up..."
    # Add any cleanup tasks here if needed
    print_success "Cleanup completed!"
}

# Main deployment function
main() {
    echo "=========================================="
    echo "🚀 NexGen Speak Frontend Deployment"
    echo "=========================================="
    echo ""

    # Parse command line arguments
    SKIP_BUILD=false
    SKIP_S3=false
    SKIP_CLOUDFRONT=false

    while [[ $# -gt 0 ]]; do
        case $1 in
            --skip-build)
                SKIP_BUILD=true
                shift
                ;;
            --skip-s3)
                SKIP_S3=true
                shift
                ;;
            --skip-cloudfront)
                SKIP_CLOUDFRONT=true
                shift
                ;;
            --help)
                echo "Usage: $0 [OPTIONS]"
                echo ""
                echo "Options:"
                echo "  --skip-build        Skip the build step"
                echo "  --skip-s3           Skip S3 deployment"
                echo "  --skip-cloudfront   Skip CloudFront invalidation"
                echo "  --help              Show this help message"
                echo ""
                exit 0
                ;;
            *)
                print_error "Unknown option: $1"
                echo "Use --help for usage information"
                exit 1
                ;;
        esac
    done

    # Run deployment steps
    check_prerequisites

    if [ "$SKIP_BUILD" = false ]; then
        build_frontend
    else
        print_warning "Skipping build step"
    fi

    if [ "$SKIP_S3" = false ]; then
        deploy_to_s3
    else
        print_warning "Skipping S3 deployment"
    fi

    if [ "$SKIP_CLOUDFRONT" = false ]; then
        invalidate_cloudfront
    else
        print_warning "Skipping CloudFront invalidation"
    fi

    cleanup

    echo ""
    echo "=========================================="
    print_success "🎉 Deployment completed successfully!"
    echo "=========================================="
    echo ""
    echo "Your frontend is now live at: https://$S3_BUCKET"
    echo ""
}

# Run main function
main "$@"
