"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { analyzeBusinessProfile, type BusinessProfile } from "@/lib/actions";
import { Loader2 } from "lucide-react";

type FormData = {
  businessName: string;
  industry: string;
  targetAudience: string;
  uniqueValue: string;
  competitors: string;
  goals: string;
  challenges: string;
  budget: string;
  timeline: string;
};

const initialFormData: FormData = {
  businessName: "",
  industry: "",
  targetAudience: "",
  uniqueValue: "",
  competitors: "",
  goals: "",
  challenges: "",
  budget: "",
  timeline: "",
};

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Retail",
  "Education",
  "Manufacturing",
  "Real Estate",
  "Food & Beverage",
  "Entertainment",
  "Other",
];

export default function ProfilerPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const result = await analyzeBusinessProfile(formData);
      setAnalysis(result);
      toast.success("Business profile analyzed successfully!");
    } catch (error) {
      toast.error("Failed to analyze business profile");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setAnalysis(null);
  };

  if (analysis) {
    return (
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Business Analysis</h1>
            <Button onClick={resetForm} variant="outline">
              Start New Analysis
            </Button>
          </div>
          <Card>
            <CardContent className="pt-6">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {analysis.split('\n').map((line, index) => {
                  if (line.startsWith('#')) {
                    return <h2 key={index} className="text-2xl font-bold mt-6 mb-4">{line.replace(/^#+\s*/, '')}</h2>;
                  }
                  if (line.startsWith('-')) {
                    return <li key={index} className="ml-4">{line.replace(/^-\s*/, '')}</li>;
                  }
                  if (line.trim() === '') {
                    return <br key={index} />;
                  }
                  return <p key={index} className="mb-4">{line}</p>;
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6">AI Business Profiler</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Answer a few questions to generate your business profile and get AI-powered insights.
      </p>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Step {currentStep} of 3</CardTitle>
            <CardDescription>
              {currentStep === 1
                ? "Basic Information"
                : currentStep === 2
                ? "Business Details"
                : "Goals & Challenges"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="Enter your business name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) => handleSelectChange("industry", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Textarea
                    id="targetAudience"
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                    placeholder="Describe your target audience"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="uniqueValue">Unique Value Proposition</Label>
                  <Textarea
                    id="uniqueValue"
                    name="uniqueValue"
                    value={formData.uniqueValue}
                    onChange={handleInputChange}
                    placeholder="What makes your business unique?"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="competitors">Main Competitors</Label>
                  <Textarea
                    id="competitors"
                    name="competitors"
                    value={formData.competitors}
                    onChange={handleInputChange}
                    placeholder="List your main competitors"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="goals">Business Goals</Label>
                  <Textarea
                    id="goals"
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    placeholder="What are your main business goals?"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="challenges">Current Challenges</Label>
                  <Textarea
                    id="challenges"
                    name="challenges"
                    value={formData.challenges}
                    onChange={handleInputChange}
                    placeholder="What challenges are you facing?"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range</Label>
                  <Select
                    value={formData.budget}
                    onValueChange={(value) => handleSelectChange("budget", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-10k">$0 - $10,000</SelectItem>
                      <SelectItem value="10k-50k">$10,000 - $50,000</SelectItem>
                      <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                      <SelectItem value="100k+">$100,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline</Label>
                  <Select
                    value={formData.timeline}
                    onValueChange={(value) => handleSelectChange("timeline", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="1-3months">1-3 months</SelectItem>
                      <SelectItem value="3-6months">3-6 months</SelectItem>
                      <SelectItem value="6-12months">6-12 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              {currentStep < 3 ? (
                <Button onClick={nextStep}>Next</Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Generate Analysis"
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 