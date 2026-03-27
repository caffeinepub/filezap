import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  document.title = "Contact Us — BoltTools.app";

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 mb-4">
          <MessageSquare className="w-7 h-7 text-accent" />
        </div>
        <h1 className="text-3xl font-extrabold mb-2">Contact Us</h1>
        <p className="text-muted-foreground">
          Have a question, feature request, or found a bug? We'd love to hear
          from you.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-10">
        <div className="bg-card border border-border rounded-xl p-5">
          <Mail className="w-5 h-5 text-accent mb-2" />
          <p className="font-semibold text-sm">Email Us Directly</p>
          <a
            href="mailto:contact@bolttools.app"
            className="text-sm text-accent hover:underline"
          >
            contact@bolttools.app
          </a>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <CheckCircle className="w-5 h-5 text-emerald-400 mb-2" />
          <p className="font-semibold text-sm">Response Time</p>
          <p className="text-sm text-muted-foreground">
            We typically respond within 24 hours.
          </p>
        </div>
      </div>

      {submitted ? (
        <div
          className="flex flex-col items-center gap-4 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-10 text-center"
          data-ocid="contact.success_state"
        >
          <CheckCircle className="w-12 h-12 text-emerald-400" />
          <h2 className="text-xl font-bold">Message Sent!</h2>
          <p className="text-muted-foreground text-sm max-w-xs">
            Thanks for reaching out. We'll get back to you within 24 hours.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSubmitted(false);
              setForm({ name: "", email: "", message: "" });
            }}
            data-ocid="contact.secondary_button"
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 bg-card border border-border rounded-2xl p-6 sm:p-8"
          data-ocid="contact.panel"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              name="name"
              required
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Jane Smith"
              data-ocid="contact.input"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
              placeholder="jane@example.com"
              data-ocid="contact.input"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) =>
                setForm((p) => ({ ...p, message: e.target.value }))
              }
              placeholder="Describe your question, feature request, or bug..."
              data-ocid="contact.textarea"
            />
          </div>
          <Button
            type="submit"
            className="h-12 font-semibold brand-gradient border-0 text-white hover:opacity-90"
            data-ocid="contact.submit_button"
          >
            Send Message
          </Button>
        </form>
      )}
    </div>
  );
}
