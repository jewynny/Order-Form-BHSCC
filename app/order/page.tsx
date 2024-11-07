'use client';
import { useState, useRef, useEffect } from 'react';
import styles from './OrderForm.module.css';

const paymentOptions = ['Cash', 'Card', 'Other'];
const sizeOptions = ['Women, Circumference: 21-22 1/2 inches', 'Men, Circumference: 23-24 inches'];
const colorOptions = ['Dark Green', 'Black'];

export default function OrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    paymentOption: '',
    quantity: 1,
    size: '',
    comments: '',
    color: '',
    signature: '',
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.lineWidth = 2;
        context.strokeStyle = '#000000';
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const signatureData = canvas.toDataURL();
      setFormData((prevData) => ({
        ...prevData,
        signature: signatureData,
      }));
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (context && canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      context.lineTo(x, y);
      context.stroke();
      context.beginPath();
      context.moveTo(x, y);
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (context && canvas) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      setFormData((prevData) => ({
        ...prevData,
        signature: '',
      }));
    }
  };

  return (
    <div className={styles.container}>
      <h1>Place Your Order</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone (optional):</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="size">Size:</label>
          <select
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
          >
            <option value="">Select a size</option>
            {sizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="color">Color:</label>
          <select
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
          >
            <option value="">Select a color</option>
            {colorOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="paymentOption">Payment Option (Handled in person):</label>
          <select
            id="paymentOption"
            name="paymentOption"
            value={formData.paymentOption}
            onChange={handleChange}
            required
          >
            <option value="">Select a payment option</option>
            {paymentOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="comments">Additional Comments:</label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            rows={4}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="signature">Signature:</label>
          <canvas
            ref={canvasRef}
            width={300}
            height={150}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            onMouseMove={draw}
            className={styles.signatureCanvas}
          />
          <button type="button" onClick={clearSignature} className={styles.clearButton}>
            Clear Signature
          </button>
        </div>
        <button type="submit" className={styles.submitButton}>
          Place Order
        </button>
      </form>
    </div>
  );
}
