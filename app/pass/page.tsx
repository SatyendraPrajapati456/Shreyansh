"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Coffee,
  Music,
  Heart,
  Palette,
  Camera,
  Gift,
  Check,
  Send,
  Phone,
  Mail,
  MessageCircle,
  Sparkles,
  Utensils,
  PartyPopper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Pass advantages data
const passAdvantages = [
  {
    icon: <Utensils className="h-8 w-8" />,
    title: "Premium Dining Experience",
    description:
      "Enjoy a gourmet 3-course meal with multiple cuisine options, premium beverages, and special dietary accommodations.",
    features: [
      "3-Course Gourmet Meal",
      "Premium Beverages",
      "Vegetarian & Vegan Options",
      "Live Food Stations",
    ],
    color: "from-orange-500 to-red-500",
  },
  {
    icon: <Music className="h-8 w-8" />,
    title: "Exclusive Entertainment",
    description:
      "Access to live performances, DJ sets, interactive games, and special surprise acts throughout the event.",
    features: [
      "Live Band Performance",
      "Professional DJ",
      "Interactive Games",
      "Surprise Celebrity Guest",
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <Camera className="h-8 w-8" />,
    title: "Professional Photography",
    description:
      "Complimentary professional photo sessions, instant prints, and access to all event photos.",
    features: [
      "Professional Photo Session",
      "Instant Photo Prints",
      "Digital Photo Gallery",
      "Custom Photo Frames",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Gift className="h-8 w-8" />,
    title: "Exclusive Souvenirs",
    description:
      "Take home personalized mementos including yearbook, custom merchandise, and farewell gifts.",
    features: [
      "Personalized Yearbook",
      "Custom T-Shirt",
      "Photo Album",
      "Farewell Certificate",
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <PartyPopper className="h-8 w-8" />,
    title: "VIP Experience",
    description:
      "Priority seating, exclusive lounge access, and special recognition during the ceremony.",
    features: [
      "Priority Seating",
      "VIP Lounge Access",
      "Special Recognition",
      "Meet & Greet Sessions",
    ],
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Lifetime Memories",
    description:
      "Create unforgettable memories with friends and teachers in a beautifully decorated venue.",
    features: [
      "Memory Wall",
      "Time Capsule Contribution",
      "Group Photo Sessions",
      "Farewell Video",
    ],
    color: "from-pink-500 to-rose-500",
  },
];

// Testimonials data
const testimonials = [
  {
    name: "Pakhi Singh",
    class: "Class 12-H",
    image: "/placeholder.svg?height=60&width=60",
    text: "The farewell pass was totally worth it! The food was amazing and the photo sessions were professional. Best memories ever!",
    rating: 5,
  },
  {
    name: "Rituraj",
    class: "Class 12-B",
    image: "/placeholder.svg?height=60&width=60",
    text: "I loved the VIP treatment and the exclusive souvenirs. The yearbook is something I'll treasure forever.",
    rating: 5,
  },
  {
    name: "Annora Lakra",
    class: "Class 12-F",
    image: "/placeholder.svg?height=60&width=60",
    text: "The entertainment was top-notch! The live band and DJ kept everyone dancing all night. Highly recommend!",
    rating: 5,
  },
];

// FAQ data
const faqs = [
  {
    question: "What's included in the farewell pass?",
    answer:
      "The pass includes premium dining, entertainment, professional photography, exclusive souvenirs, VIP experience, and access to all event activities.",
  },
  {
    question: "Can I get a refund if I can't attend?",
    answer:
      "Refunds are available up to 7 days before the event. After that, passes can be transferred to another student with prior approval.",
  },
  {
    question: "Are there different types of passes available?",
    answer:
      "Currently, we offer one comprehensive pass that includes all benefits. We believe in providing the best experience for everyone.",
  },
  {
    question: "How do I collect my pass and souvenirs?",
    answer:
      "Passes will be distributed during school hours starting one week before the event. Souvenirs will be given during the farewell ceremony.",
  },
  {
    question: "Can parents attend with the pass?",
    answer:
      "Each student pass allows entry for one accompanying family member. Additional guest passes can be purchased separately.",
  },
  {
    question: "What if I have dietary restrictions?",
    answer:
      "We accommodate all dietary restrictions including vegetarian, vegan, gluten-free, and other special requirements. Please mention this in your inquiry.",
  },
];

export default function PassPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    class: "",
    section: "",
    inquiryType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        class: "",
        section: "",
        inquiryType: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block mb-6">
              <div className="h-20 w-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Farewell Pass{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                2025
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Your all-access ticket to an unforgettable farewell experience.
              Premium dining, exclusive entertainment, professional photography,
              and lifetime memories - all included in one comprehensive pass.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Get Your Pass - ₹100
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500/50 text-purple-400 hover:bg-purple-900/20"
                onClick={() => {
                  const formSection = document.getElementById("inquiry-form");
                  const nameInput = document.getElementById("name");
                  formSection?.scrollIntoView({ behavior: "smooth" });
                  // Add a small delay to ensure the scroll completes before focusing
                  setTimeout(() => {
                    nameInput?.focus();
                  }, 800);
                }}
              >
                Send Inquiry
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pass Advantages Section */}
      <section className="py-20 px-4 md:px-6 bg-gray-900">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Our Farewell Pass?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Experience the ultimate farewell celebration with exclusive
              benefits and premium services designed to make your last school
              event truly memorable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {passAdvantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="bg-gray-800 border-gray-700 h-full hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                  <CardContent className="p-6">
                    <div
                      className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${advantage.color} mb-4`}
                    >
                      <div className="text-white">{advantage.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {advantage.title}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      {advantage.description}
                    </p>
                    <ul className="space-y-2">
                      {advantage.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center text-sm text-gray-300"
                        >
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 md:px-6 bg-black">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Transparent Pricing
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              See exactly what you're paying for with our detailed cost
              breakdown. No hidden fees, just premium value.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border border-purple-500/30">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">
                      What's Included
                    </h3>
                    <div className="space-y-4">
                      <PricingItem
                        title="Premium Food & Beverages"
                        amount={10}
                        description="3-course gourmet meal, premium drinks, live food stations"
                        icon={<Coffee />}
                      />
                      <PricingItem
                        title="Venue & Decorations"
                        amount={20}
                        description="Elegant venue with professional decorations and lighting"
                        icon={<Palette />}
                      />
                      <PricingItem
                        title="Entertainment Package"
                        amount={30}
                        description="Live band, DJ, interactive games, and surprise acts"
                        icon={<Music />}
                      />
                      <PricingItem
                        title="Souvenirs & Photography"
                        amount={40}
                        description="Professional photos, yearbook, custom merchandise"
                        icon={<Camera />}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col justify-center">
                    <div className="text-center p-8 bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-xl border border-purple-500/30">
                      <div className="text-6xl font-bold text-white mb-2">
                        ₹100
                      </div>
                      <p className="text-purple-300 mb-6">All-Inclusive Pass</p>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-center text-green-400">
                          <Check className="h-5 w-5 mr-2" />
                          <span>No Hidden Charges</span>
                        </div>
                        <div className="flex items-center justify-center text-green-400">
                          <Check className="h-5 w-5 mr-2" />
                          <span>Transferable Pass</span>
                        </div>
                        <div className="flex items-center justify-center text-green-400">
                          <Check className="h-5 w-5 mr-2" />
                          <span>7-Day Refund Policy</span>
                        </div>
                      </div>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        Reserve Your Pass
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="inquiry-form" className="py-20 px-4 md:px-6 bg-gray-900">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Have Questions? Send Us an Inquiry
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get in touch with our team for any questions about the farewell
              pass, special requirements, or group bookings.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div>
                <Card className="bg-gray-800 border-gray-700 h-full">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-6">
                      Get in Touch
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-purple-400 mr-3 mt-1" />
                        <div>
                          <p className="text-white font-medium">Phone</p>
                          <p className="text-gray-400">+91 93406 79336</p>
                          <p className="text-gray-400">+91 80858 51573</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-purple-400 mr-3 mt-1" />
                        <div>
                          <p className="text-white font-medium">Email</p>
                          <p className="text-gray-400">farewell@school.edu</p>
                          <p className="text-gray-400">
                            passes@farewell2025.com
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MessageCircle className="h-5 w-5 text-purple-400 mr-3 mt-1" />
                        <div>
                          <p className="text-white font-medium">WhatsApp</p>
                          <p className="text-gray-400">
                            Join our group for updates
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 border-green-500/50 text-green-400 hover:bg-green-900/20"
                          >
                            Join WhatsApp Group
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                      <h4 className="text-white font-semibold mb-2">
                        Quick Response Times
                      </h4>
                      <p className="text-gray-300 text-sm">
                        We typically respond to inquiries within 2-4 hours
                        during school days and within 24 hours on weekends.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Inquiry Form */}
              <div>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-6">
                      Send Your Inquiry
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-white">
                            Full Name
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-white">
                            Email
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-white">
                            Phone
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            placeholder="Your phone number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="class" className="text-white">
                            Class
                          </Label>
                          <Select
                            value={formData.class}
                            onValueChange={(value) =>
                              handleSelectChange("class", value)
                            }
                          >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700 text-white">
                              <SelectItem value="10">Class 10</SelectItem>
                              <SelectItem value="11">Class 11</SelectItem>
                              <SelectItem value="12">Class 12</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="section" className="text-white">
                            Section
                          </Label>
                          <Select
                            value={formData.section}
                            onValueChange={(value) =>
                              handleSelectChange("section", value)
                            }
                          >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700 text-white">
                              <SelectItem value="A">Section A</SelectItem>
                              <SelectItem value="B">Section B</SelectItem>
                              <SelectItem value="C">Section C</SelectItem>
                              <SelectItem value="D">Section D</SelectItem>
                              <SelectItem value="E">Section E</SelectItem>
                              <SelectItem value="F">Section F</SelectItem>
                              <SelectItem value="G">Section G</SelectItem>
                              <SelectItem value="H">Section H</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="inquiryType" className="text-white">
                          Inquiry Type
                        </Label>
                        <Select
                          value={formData.inquiryType}
                          onValueChange={(value) =>
                            handleSelectChange("inquiryType", value)
                          }
                          required
                        >
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue placeholder="What can we help you with?" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700 text-white">
                            <SelectItem value="pass-purchase">
                              Pass Purchase
                            </SelectItem>
                            <SelectItem value="dietary-requirements">
                              Dietary Requirements
                            </SelectItem>
                            <SelectItem value="refund-policy">
                              Refund Policy
                            </SelectItem>
                            <SelectItem value="general-inquiry">
                              General Inquiry
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-white">
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Please describe your inquiry in detail..."
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 min-h-[120px]"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Inquiry
                          </>
                        )}
                      </Button>
                    </form>

                    {showSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-green-900/20 border border-green-500/30 rounded-lg"
                      >
                        <div className="flex items-center text-green-400">
                          <Check className="h-5 w-5 mr-2" />
                          <span>
                            Inquiry sent successfully! We'll get back to you
                            soon.
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-6 bg-black">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Students Say
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Hear from previous students who experienced our farewell pass and
              created unforgettable memories.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-800 border-gray-700 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="h-12 w-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="text-white font-semibold">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {testimonial.class}
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-yellow-500 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-gray-300 italic">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-6 bg-gray-900">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Find answers to common questions about our farewell pass and event
              details.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-white hover:text-purple-400 text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-t from-black to-gray-900">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Create Unforgettable Memories?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Don't miss out on the ultimate farewell experience. Get your pass
              today and be part of something special.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Get Your Pass Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500/50 text-purple-400 hover:bg-purple-900/20"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Ask a Question
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function PricingItem({ title, amount, description, icon }) {
  return (
    <div className="flex items-start">
      <div className="text-purple-400 p-2 rounded-md mr-3">{icon}</div>
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-medium text-white">{title}</h4>
          <span className="font-bold text-white">₹{amount}</span>
        </div>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
}
