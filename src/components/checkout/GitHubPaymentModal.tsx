'use client';

import React from 'react';
import { Button } from '@/components/ui';
import { Github, ExternalLink, Copy, Check } from 'lucide-react';
import { GitHubPaymentResponse } from '@/core/entities/GitHubPayment';

interface GitHubPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentData: GitHubPaymentResponse;
  onPaymentComplete?: () => void;
}

export function GitHubPaymentModal({ 
  isOpen, 
  onClose, 
  paymentData, 
  onPaymentComplete 
}: GitHubPaymentModalProps) {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(paymentData.sponsorshipUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  const handleOpenGitHub = () => {
    window.open(paymentData.sponsorshipUrl, '_blank');
    if (onPaymentComplete) {
      onPaymentComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <Github className="h-8 w-8 text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold text-neutral-900">
            GitHub Sponsors Payment
          </h2>
          <p className="text-sm text-neutral-600 mt-2">
            Complete your payment through GitHub Sponsors
          </p>
        </div>

        {/* Payment Details */}
        <div className="bg-neutral-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-neutral-700">Amount (USD):</span>
            <span className="text-lg font-bold text-neutral-900">
              ${paymentData.amountUSD}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-neutral-700">Payment ID:</span>
            <span className="text-sm text-neutral-600 font-mono">
              {paymentData.paymentId.slice(-8)}
            </span>
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-3">
          <h3 className="font-medium text-neutral-900">How to complete payment:</h3>
          <ol className="text-sm text-neutral-600 space-y-2">
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-purple-100 text-purple-600 text-xs font-medium mr-2 mt-0.5">
                1
              </span>
              Click &ldquo;Open GitHub Sponsors&rdquo; below
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-purple-100 text-purple-600 text-xs font-medium mr-2 mt-0.5">
                2
              </span>
              Log in to your GitHub account
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-purple-100 text-purple-600 text-xs font-medium mr-2 mt-0.5">
                3
              </span>
              Confirm the sponsorship amount
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-purple-100 text-purple-600 text-xs font-medium mr-2 mt-0.5">
                4
              </span>
              Complete the payment process
            </li>
          </ol>
        </div>

        {/* URL Display */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">
            Sponsorship URL:
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={paymentData.sponsorshipUrl}
              readOnly
              className="flex-1 px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-md font-mono"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyUrl}
              className="flex-shrink-0"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleOpenGitHub}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Github className="h-4 w-4 mr-2" />
            Open GitHub Sponsors
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Footer Note */}
        <div className="text-xs text-neutral-500 text-center">
          <p>
            By proceeding, you&apos;ll be redirected to GitHub Sponsors.
            Your order will be processed automatically after payment confirmation.
          </p>
        </div>
      </div>
    </div>
  );
}
